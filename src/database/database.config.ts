import { ConfigType, registerAs } from '@nestjs/config';
import { int, isTruly } from '../common';

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: int(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  logging: isTruly(process.env.DATABASE_LOGGING),
}));

export type DatabaseConfig = ConfigType<typeof databaseConfig>;
