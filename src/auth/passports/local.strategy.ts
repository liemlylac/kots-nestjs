import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  //noinspection JSUnusedGlobalSymbols
  async validate(request, email, password) {
    const user = await this.authService.getValidUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    return user;
  }
}
