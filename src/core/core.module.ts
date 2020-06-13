import { Module, Global } from '@nestjs/common';
import { EmailService } from './services/email.service';

@Global()
@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class CoreModule {}
