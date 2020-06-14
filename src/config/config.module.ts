import { Module, DynamicModule } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { authConfig, authConfigSchema } from './config/auth.config';
import { databaseConfig, databaseConfigSchema } from './config/database.config';
import { generalConfig, generalConfigSchema } from './config/general.config';
import { mailConfig, mailConfigSchema } from './config/mail.config';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          load: [generalConfig, databaseConfig, authConfig, mailConfig],
          validationSchema: Joi.object({
            ...authConfigSchema,
            ...databaseConfigSchema,
            ...generalConfigSchema,
            ...mailConfigSchema,
          }),
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
