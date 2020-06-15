import {
  Module,
  Logger,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { providers } from './app.providers';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { MailConfigService } from './core/services/mail-config.service';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot(),
    DatabaseModule.forRoot(),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    AuthModule,
    UserModule,
  ],
  providers: [...providers, Logger],
})
export class AppModule implements NestModule {
  // noinspection JSUnusedGlobalSymbols
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
