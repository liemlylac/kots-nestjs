import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import generalConfig from './general.config';
import databaseConfig from './database.config';
import authConfig from './auth.config';

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          load: [generalConfig, databaseConfig, authConfig],
        }),
      ],
      providers: [ConfigService],
      exports: [ConfigService]
    }
  }
}
