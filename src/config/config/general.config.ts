import * as Joi from '@hapi/joi';

export const generalConfigSchema = {
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(3000),
  API_ROOT: Joi.string().default('api'),
}

export function generalConfig() {
  return {
    port: parseInt(process.env.PORT, 10),
    apiRoot: process.env.API_ROOT,
  }
}
