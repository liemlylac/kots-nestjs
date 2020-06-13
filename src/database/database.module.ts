import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql', // Current only support connect one db type is mysql
            host: configService.get<string>('db.host'),
            port: configService.get<number>('db.port'),
            username: configService.get<string>('db.username'),
            password: configService.get<string>('db.password'),
            database: configService.get<string>('db.database'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: configService.get<boolean>('db.logging'),
            migrationsTableName: 'migration',
            migrations: ['/migration/*{.ts, .js}'],
            cli: {
              entitiesDir: '/**/*.entity{.ts, .js}',
              migrationsDir: '/migration',
            },
          }),
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
