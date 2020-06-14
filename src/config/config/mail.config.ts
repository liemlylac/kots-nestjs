import * as Joi from '@hapi/joi';

export const mailConfigSchema = {
  MAIL_PREVIEW: Joi.boolean().default(true),
  MAIL_HOST: Joi.string().default('smtp.example.com'),
  MAIL_PORT: Joi.number().default(465),
  MAIL_AUTH_USER: Joi.string().default('username'),
  MAIL_AUTH_PASS: Joi.string().default('password'),
  MAIL_DEV_USER: Joi.string().default('username'),
  MAIL_DEV_PASS: Joi.string().default('password'),
};

export function mailConfig() {
  return {
    mail: {
      preview: process.env.MAIL_PREVIEW.toString().toLowerCase() === 'true',
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
  };
}
