import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  //noinspection JSUnusedGlobalSymbols
  /**
   * This function will be called by PassportStrategy
   *
   * @note noinspection adding to avoid inspection unused method
   *
   * @param email string
   * @param password string
   */
  async validate(email, password) {
    const user = await this.authService.validateLogin(email, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    return user;
  }
}
