import { ConfigModule } from '@config/config.module';
import { MailerModule } from '@nestjs-modules/mailer';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { LoggerMiddleware } from '@app/common';
import { MailConfigService } from '@app/mail';

import { providers } from './app.providers';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { MysqlModule } from './database/mysql.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { SpaceModule } from './space/space.module';
import { IssueModule } from './issue/issue.module';
import { WikiModule } from './wiki/wiki.module';
import { FileModule } from './file/file.module';
import { PriorityModule } from './priority/priority.module';
import { ResolutionModule } from './resolution/resolution.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    AuthModule,
    MailModule.forRoot(),
    MailerModule.forRootAsync({ useClass: MailConfigService }),
    MysqlModule.forRoot(),
    FileModule.forRoot(),
    UserModule,
    ProjectModule,
    SpaceModule,
    IssueModule,
    WikiModule,
    PriorityModule,
    ResolutionModule,
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
