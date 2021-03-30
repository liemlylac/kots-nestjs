import { ConfigModule } from '@config/config.module';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { mailConfig } from './mail.config';
import { MailService } from './services';

@Global()
@Module({})
export class MailModule {
  static forRoot(): DynamicModule {
    const config = ConfigModule.forFeature(mailConfig);
    return {
      module: MailModule,
      providers: [MailService, ...config.providers],
      exports: [MailService, ...config.exports],
    };
  }
}
