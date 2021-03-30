import * as Joi from '@hapi/joi';

export const configSchema = {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  FRONTEND_URL: Joi.string().default('http://localhost:4200'),
  API_ROOT: Joi.string().default('api'),
  ENABLE_SWAGGER: Joi.boolean().default(false),
  LOGGING_INTERNAL_SERVER_ERROR: Joi.boolean().default(true),
  // Database
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USER: Joi.string().default('lander'),
  DATABASE_PASSWORD: Joi.string().default('secret'),
  DATABASE_DATABASE: Joi.string().default('lander'),
  DATABASE_LOGGING: Joi.boolean().default(true),
  // Auth
  AUTH_PWD_PEPPER: Joi.string().default('landerSuperSecretPepper'),
  AUTH_PWD_RESET_TOKEN_LIFE_TIME: Joi.number().default(1800000),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().default('landerJwtSecretKey'),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().default('landerRefreshJwtSecretKey'),
  // Mail
  MAIL_PREVIEW: Joi.boolean().default(true),
  MAIL_HOST: Joi.string().default('smtp.example.com'),
  MAIL_PORT: Joi.number().default(465),
  MAIL_AUTH_USER: Joi.string().default('username'),
  MAIL_AUTH_PASS: Joi.string().default('password'),
  MAIL_DEV_USER: Joi.string().default('username'),
  MAIL_DEV_PASS: Joi.string().default('password'),
};
