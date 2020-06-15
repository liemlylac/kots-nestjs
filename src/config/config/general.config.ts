import * as Joi from '@hapi/joi';

export const generalConfigSchema = {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  FE_URL: Joi.string().default('http://localhost:4200'),
  API_ROOT: Joi.string().default('api'),
  ENABLE_SWAGGER: Joi.boolean().default(false),
  LOGGING_INTERNAL_SERVER_ERROR: Joi.boolean().default(true),
};

export function generalConfig() {
  return {
    port: parseInt(process.env.PORT, 10),
    feUrl: process.env.FE_URL,
    apiRoot: process.env.API_ROOT,
    enableSwagger:
      process.env.ENABLE_SWAGGER.toString().toLowerCase() === 'true',
    loggingInternalServerError:
      process.env.LOGGING_INTERNAL_SERVER_ERROR.toString().toLowerCase() ===
      'true',
  };
}
