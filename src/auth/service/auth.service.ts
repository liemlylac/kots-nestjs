import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Register } from '../dto/register.dto';
import { ResetPassword } from '../dto/reset-password.dto';
import { LoginRO } from '../ro/login.ro';
import { CryptoService } from './crypto.service';
import { HashService } from './hash.service';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/entity/user.entity';
import { MailService } from '../../core/services/mail.service';
import { LoggerService } from '../../core/services/logger-service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService,
    private readonly usersService: UserService,
  ) {}

  /**
   * Use for LocalStrategy
   *
   * @param username
   * @param password
   */
  async validateLogin(username, password) {
    const user = await this.validateUser(username);
    if (user && (await this.hashService.compareHash(password, user.password))) {
      return user;
    }
    return null;
  }

  /**
   * Use for JwtStrategy
   *
   * @param username
   */
  async validateUser(username) {
    const user = await this.usersService.getByUsername(username);
    if (user && user.active) {
      return user;
    }
    return null;
  }

  /**
   * Use to return user data and token after login successfully
   *
   * @param user
   */
  async afterLogin(user: User): Promise<LoginRO> {
    const payload = { userId: user.id, username: user.username };
    return {
      displayName: user.displayName,
      username: user.username,
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Register a new user
   *
   * @param register
   */
  async register(register: Register): Promise<LoginRO> {
    const existingUser = await this.usersService.getByUsername(
      register.username,
    );
    if (existingUser && existingUser.id) {
      throw new ConflictException('User with this username is already exists');
    }
    // If username is available, create a new user and login
    const newUser = await this.usersService.create(register);
    return this.afterLogin(newUser);
  }

  /**
   *
   * @param email
   */
  async requestPassword(email: string) {
    const user = await this.usersService.getByEmail(email);
    if (!user || !user.active) {
      throw new NotFoundException('User with this email is not existed');
    }

    const content = {
      userId: user.id,
      valid:
        new Date().getTime() +
        Number(this.configService.get<number>('auth.pwd.resetTokenLifeTime')),
    };
    const token = this.cryptoService.generateCipherToken(content);

    await this.sendMailRequestPassword(user, token);
  }

  protected async sendMailRequestPassword(user: User, token) {
    const resetTokenLifeTime = this.configService.get(
      'auth.pwd.resetTokenLifeTime',
    ); // unit ms. Default: 1,800,000ms

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
          'You recently request to reset your password for Kots account',
        displayName: user.displayName,
        token,
        resetTokenLifeTime: resetTokenLifeTime / 60000, //convert to minutes
      },
    };

    try {
      const sendMailInfo = await this.mailService.sendMail(data);
      return sendMailInfo.accepted.join();
    } catch (error) {
      this.logger.error(error, AuthService.name);
      throw new InternalServerErrorException();
    }
  }

  protected verifyTokenExp(tokenContent) {
    if (new Date().getTime() > tokenContent.valid) {
      throw new BadRequestException('Reset password token has expired.');
    }
  }

  /**
   *
   * @param resetPwdToken
   */
  verifyResetPasswordToken(resetPwdToken: string): boolean {
    const tokenContent = this.decodeToken(resetPwdToken);
    this.verifyTokenExp(tokenContent);
    return true;
  }

  /**
   *
   * @param token
   * @param resetPassword
   */
  async resetPassword(token: string, resetPassword: ResetPassword) {
    const tokenContent = this.decodeToken(token);
    this.verifyTokenExp(tokenContent);
    const user: User = await this.usersService.changePassword(
      tokenContent.userId,
      resetPassword.password,
    );
    await this.sendMailResetPassword(user);
  }

  protected decodeToken(token) {
    try {
      return this.cryptoService.decodeCipherFromToken(token);
    } catch (e) {
      this.logger.error(e, AuthService.name);
      throw new BadRequestException('Invalid token');
    }
  }

  protected async sendMailResetPassword(user: User) {
    /**
     * Prepare data for template mail
     */
    const data = {
      to: user.email,
      subject: 'Password changed',
      template: 'reset-password',
      context: {
        metaTitle: 'Password changed',
        metaDescription: 'Your Kots password has been changed',
        displayName: user.displayName,
      },
    };

    try {
      const sendMailInfo = await this.mailService.sendMail(data);
      return sendMailInfo.accepted.join();
    } catch (error) {
      this.logger.error(error, AuthService.name);
      throw new InternalServerErrorException();
    }
  }
}
