import { ConfigType, registerAs } from '@nestjs/config';
import { isTruly } from '../common';

export const mailConfig = registerAs('mail', () => ({
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
}));

export type MailConfig = ConfigType<typeof mailConfig>;
