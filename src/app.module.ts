import {
  Module,
  Logger,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { WinstonConfigService } from './core/services/winston-config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { providers } from './app.providers';
import { LoggerMiddleware } from './core/middleware/logger.middleware';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot(),
    DatabaseModule.forRoot(),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
    AuthModule,
    UserModule,
  ],
  providers: [...providers, Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
