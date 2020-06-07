import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
   super({
     usernameField: 'username',
     passwordField: 'password',
     passReqToCallback: false
   });
  }

  //noinspection JSUnusedGlobalSymbols
  /**
   * This function will be called by PassportStrategy
   *
   * @note noinspection adding to avoid inspection unused method
   *
   * @param username string
   * @param password string
   */
  async validate(username, password) {
    const user = await this.authService.validateLogin(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
