import { Module, Global } from '@nestjs/common';
import { MailService } from './services/mail.service';

@Global()
@Module({
  imports: [],
  providers: [MailService],
  exports: [MailService],
})
export class CoreModule {}
