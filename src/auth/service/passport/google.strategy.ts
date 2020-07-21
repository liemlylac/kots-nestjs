import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginUser } from '../../ro/login.ro';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('auth.oauth.googleClientId'),
      clientSecret: configService.get('auth.oauth.googleSecret'),
      callbackURL: configService.get('auth.oauth.googleCallback'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user: LoginUser = {
      email: emails[0].value,
      fullName: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
