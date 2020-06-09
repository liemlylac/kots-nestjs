import * as Joi from '@hapi/joi';

export const databaseConfigSchema = {
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USER: Joi.string().default('kots'),
  DATABASE_PASSWORD: Joi.string().default('kotsSecret'),
  DATABASE_DATABASE: Joi.string().default('kotsdb'),
  DATABASE_LOGGING: Joi.boolean().default(true),
};

export function databaseConfig() {
  return {
    db: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      logging: process.env.DATABASE_LOGGING + ''.toLowerCase() === 'true',
    },
  };
}
