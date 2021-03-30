import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@config/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG } from '../../config';
import { AuthService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: CONFIG.AUTH.IGNORE_EXPIRATION,
      secretOrKey: config.get('auth.accessTokenSecret'),
      passReqToCallback: true,
    });
  }

  //noinspection JSUnusedGlobalSymbols
  async validate(request, payload: any) {
    const user = await this.authService.getActiveUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
