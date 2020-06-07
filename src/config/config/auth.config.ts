import * as Joi from '@hapi/joi';

export const authConfigSchema = {
  AUTH_PWD_PEPPER: Joi.string().default('kotsSecretPepper'),
  AUTH_PWD_RESET_TOKEN_LIFE_TIME: Joi.number().default(86400000),
  JWT_ACCESS_SECRET_KEY: Joi.string().default('kotsJwtSecretKey'),
  JWT_REFRESH_SECRET_KEY: Joi.string().default('kotsRefreshJwtSecretKey'),
  JWT_ACCESS_KEY_LIFE_TIME: Joi.number().default(28800),
  JWT_REFRESH_SECRET_KEY_LIFE_TIME: Joi.number().default(2592000),
}

export function authConfig() {
  return {
    auth: {
      pwd: {
        pepper: process.env.AUTH_PWD_PEPPER || 'kotsSecretPepper',
        resetTokenLifeTime: process.env.AUTH_PWD_RESET_TOKEN_LIFE_TIME || 86400000
      },
      jwt: {
        accessSecretKey: process.env.JWT_ACCESS_SECRET_KEY || 'kotsJwtSecretKey',
        refreshSecretKey: process.env.JWT_REFRESH_SECRET_KEY || 'kotsRefreshJwtSecretKey',
        accessKeyLifetime: process.env.JWT_ACCESS_KEY_LIFE_TIME || 28800,
        refreshSecretKeyLifetime: process.env.JWT_REFRESH_SECRET_KEY_LIFE_TIME || 2592000,
      }
    }
  }
}
