import { ConfigType, registerAs } from '@nestjs/config';
import { int, isTruly } from '../common';

export const config = () => ({
  nodeEnv: process.env.NODE_ENV,
  port: int(process.env.PORT),
  frontendUrl: process.env.FRONTEND_URL,
  apiRoot: process.env.API_ROOT,
  enableSwagger: isTruly(process.env.ENABLE_SWAGGER),
  loggingInternalServerError: isTruly(
    process.env.LOGGING_INTERNAL_SERVER_ERROR,
  ),
  // Auth
  auth: {
    pepper: process.env.AUTH_PWD_PEPPER,
    resetTokenLifeTime: int(process.env.AUTH_PWD_RESET_TOKEN_LIFE_TIME),
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    accessTokenLifetime: 900, // 15 minutes
    refreshTokenLifetime: 604800, // 7 days
    oauth: {},
  },
  // Mail
  mail: {
    preview: isTruly(process.env.MAIL_PREVIEW),
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: Number(process.env.MAIL_AUTH_PORT) === 465,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
    dev: {
      user: process.env.MAIL_DEV_USER,
      pass: process.env.MAIL_DEV_PASS,
    },
  },
});

export const appConfig = registerAs('app', config);

// noinspection JSUnusedGlobalSymbols
export type AppConfig = ConfigType<typeof appConfig>;
