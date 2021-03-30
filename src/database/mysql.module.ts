import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, DatabaseConfig } from './database.config';

@Module({})
export class MysqlModule {
  static forRoot(): DynamicModule {
    // noinspection JSUnusedGlobalSymbols
    return {
      module: MysqlModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule.forFeature(databaseConfig)],
          inject: [databaseConfig.KEY],
          useFactory: (dbConfig: DatabaseConfig) => ({
            type: 'mysql', // Current only support connect one db type is mysql
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: dbConfig.logging,
            migrationsTableName: 'migration',
            migrations: [],
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
