import { ConfigType, registerAs } from '@nestjs/config';
import { int } from '../common';

export const authConfig = registerAs('auth', () => ({
  pepper: process.env.AUTH_PWD_PEPPER,
  resetTokenLifeTime: int(process.env.AUTH_PWD_RESET_TOKEN_LIFE_TIME),
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  accessTokenLifetime: 900, // 15 minutes
  refreshTokenLifetime: 604800, // 7 days
  oauth: {},
}));

export type AuthConfig = ConfigType<typeof authConfig>;
