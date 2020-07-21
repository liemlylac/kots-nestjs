import * as Joi from '@hapi/joi';

export const authConfigSchema = {
  AUTH_PWD_PEPPER: Joi.string().default('kotsSecretPepper'),
  AUTH_PWD_RESET_TOKEN_LIFE_TIME: Joi.number().default(1800000),
  JWT_ACCESS_SECRET_KEY: Joi.string().default('kotsJwtSecretKey'),
  JWT_REFRESH_SECRET_KEY: Joi.string().default('kotsRefreshJwtSecretKey'),
  JWT_ACCESS_KEY_LIFE_TIME: Joi.number().default(28800000),
  JWT_REFRESH_SECRET_KEY_LIFE_TIME: Joi.number().default(2592000),
};

export function authConfig() {
  return {
    auth: {
      pwd: {
        pepper: process.env.AUTH_PWD_PEPPER,
        resetTokenLifeTime: process.env.AUTH_PWD_RESET_TOKEN_LIFE_TIME,
      },
      jwt: {
        accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY,
        refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY,
        accessKeyLifetime: process.env.JWT_ACCESS_KEY_LIFE_TIME,
        refreshSecretKeyLifetime: process.env.JWT_REFRESH_SECRET_KEY_LIFE_TIME,
      },
      oauth: {
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleSecret: process.env.GOOGLE_SECRET,
        googleCallback: process.env.GOOGLE_CALLBACK,
      },
    },
  };
}
