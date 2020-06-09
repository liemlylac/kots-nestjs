import { Module, DynamicModule } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { authConfig, authConfigSchema } from './config/auth.config';
import { databaseConfig, databaseConfigSchema } from './config/database.config';
import { generalConfig, generalConfigSchema } from './config/general.config';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          load: [generalConfig, databaseConfig, authConfig],
          validationSchema: Joi.object({
            ...authConfigSchema,
            ...databaseConfigSchema,
            ...generalConfigSchema,
          }),
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
