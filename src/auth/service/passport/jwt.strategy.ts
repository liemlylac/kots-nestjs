import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CONFIG } from '../../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
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
    return { userId: payload.userId, username: payload.username };
  }
}
