import { HashService } from '@app/common';
import { MailService } from '@app/mail';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity, UserService } from '../../user';
import { authConfig, AuthConfig } from '../auth.config';
import { getSignatureFromJwt } from '../auth.helper';
import { RefreshTokenDTO, RegisterDTO, ResetPasswordDTO } from '../dto';
import { SessionService } from './session.service';
import { LoginResultRO } from '../ro';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    // eslint-disable-next-line
    @Inject(authConfig.KEY)
    private readonly authConfig: AuthConfig,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly mailService: MailService,
    private readonly sessionService: SessionService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getValidUser(email, password): Promise<UserEntity | null> {
    const user = await this.getActiveUserByEmail(email);
    const pepper = this.authConfig.pepper;
    if (
      user &&
      (await this.hashService.compareHash(password, user.password, pepper))
    ) {
      return user;
    }
    return null;
  }

  async getActiveUserByEmail(email: string): Promise<UserEntity | null> {
    const account = await this.userService.getByEmail(email);
    if (account && account.active) {
      return account;
    }
    return null;
  }

  hashPassword(password: string): Promise<string> {
    const pepper = this.authConfig.pepper;
    return this.hashService.hash(password, pepper);
  }

  generateTokens(user, loginType = 'password') {
    const payload = { id: user.id, email: user.email, loginType };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.authConfig.accessTokenSecret,
        expiresIn: this.authConfig.accessTokenLifetime,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.authConfig.refreshTokenSecret,
        expiresIn: this.authConfig.refreshTokenLifetime,
      }),
    };
  }

  async login(user: UserEntity): Promise<LoginResultRO> {
    const tokenPack = this.generateTokens(user);
    const sessionData = {
      userId: user.id,
      signature: getSignatureFromJwt(tokenPack.refreshToken),
    };
    const session = await this.sessionService.saveSession(sessionData);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      token: { deviceId: session.deviceId, ...tokenPack },
    };
  }

  async register(register: RegisterDTO): Promise<LoginResultRO> {
    const newUser = await this.userService.register(register);
    return await this.login(newUser);
  }

  async requestPassword(email: string): Promise<{ email }> {
    const user = await this.userService.getByEmail(email);
    if (!user || !user.active) {
      return Promise.resolve({ email });
    }

    const token = await this.generateResetPasswordToken(user);

    this.sendMailRequestPassword(user, token).catch(error => {
      this.logger.error(error);
    });

    return Promise.resolve({ email });
  }

  generateResetPasswordToken(user: UserEntity): Promise<string> {
    const content = {
      email: user.email,
    };

    return this.jwtService.signAsync(content, {
      expiresIn: this.authConfig.resetTokenLifeTime,
      secret: this.hashService.getSalt(user.password),
    });
  }

  async verifyResetPasswordToken(resetPwdToken: string): Promise<boolean> {
    const payload = await this.verifyOneTimeToken(resetPwdToken);
    return !!payload.email;
  }

  protected async verifyOneTimeToken(token): Promise<any> {
    try {
      const tokenContent: any = this.jwtService.decode(token, { json: true });
      const user = await this.getActiveUserByEmail(tokenContent.email);
      return await this.jwtService.verifyAsync(token, {
        secret: this.hashService.getSalt(user.password),
      });
    } catch (e) {
      throw new BadRequestException('Token is invalid.');
    }
  }

  async resetPassword(token, resetPassword: ResetPasswordDTO) {
    const payload: any = await this.verifyOneTimeToken(token);
    const account = await this.userService.resetPassword(
      payload.email,
      resetPassword.password,
    );
    this.sendMailResetPassword(account).catch(error => {
      this.logger.error(error);
    });
    return { email: account.email };
  }

  protected async sendMailRequestPassword(user: UserEntity, token) {
    const resetTokenLifeTime = this.authConfig.resetTokenLifeTime; // unit ms. Default: 1,800,000ms ~ 1,800s ~ 30m

    /**
     * Prepare data for template mail
     */
    const data = {
      to: user.email,
      subject: 'Request to reset password',
      template: 'request-password',
      context: {
        metaTitle: 'Request to reset password',
        metaDescription:
          'You recently request to reset your password for Lander account',
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        token: token,
        resetTokenLifeTime: resetTokenLifeTime / 60000, //convert to minutes
      },
    };

    try {
      const sendMailInfo = await this.mailService.sendMail(data);
      return sendMailInfo.accepted.join();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  protected async sendMailResetPassword(user: UserEntity) {
    /**
     * Prepare data for template mail
     */
    const data = {
      to: user.email,
      subject: 'Password changed',
      template: 'reset-password',
      context: {
        metaTitle: 'Password changed',
        metaDescription: 'Your Lander password has been changed',
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
      },
    };

    try {
      const sendMailInfo = await this.mailService.sendMail(data);
      return sendMailInfo.accepted.join();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  verifyRefreshToken(refreshToken): any {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: this.authConfig.refreshTokenSecret,
      });
    } catch (err) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async refreshToken(tokens: RefreshTokenDTO) {
    const payload = this.verifyRefreshToken(tokens.refreshToken);
    const user = await this.userService.getByIdOrFailed(payload.id);
    const signature = getSignatureFromJwt(tokens.refreshToken);
    const session = await this.sessionService.getSession(
      user.id,
      tokens.deviceId,
    );

    if (!session || signature !== session.signature) {
      throw new UnauthorizedException();
    }

    const newTokens = this.generateTokens(user);
    session.signature = getSignatureFromJwt(newTokens.refreshToken);
    await this.sessionService.saveSession(session);

    return { deviceId: session.deviceId, ...newTokens };
  }

  async logout(userId, deviceId): Promise<void> {
    try {
      await this.sessionService.removeSession(userId, deviceId);
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }
}
