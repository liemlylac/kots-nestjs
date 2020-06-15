import { Module, Global } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { LoggerService } from './services/logger-service';

@Global()
@Module({
  imports: [],
  providers: [LoggerService, MailService],
  exports: [LoggerService, MailService],
})
export class CoreModule {}
