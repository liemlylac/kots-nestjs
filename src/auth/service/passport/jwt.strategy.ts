import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CONFIG } from '../../../config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: CONFIG.AUTH.JWT.IGNORE_EXPIRATION,
      secretOrKey: configService.get<string>('auth.jwt.accessSecretKey'),
    });
  }

  //noinspection JSUnusedGlobalSymbols
  /**
   * This method will call automatically when using JWT to validate token
   *
   * @note noinspection adding to avoid inspection unused method
   *
   * @param payload
   */
  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.email);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    return user;
  }
}
