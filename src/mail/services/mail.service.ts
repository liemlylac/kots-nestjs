import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@config/config.service';
import { SentMessageInfo } from 'nodemailer';

export interface SendMailData {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

@Injectable()
export class MailService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendMail(data: SendMailData): Promise<SentMessageInfo> {
    const context = { ...data.context };
    context.frontendUrl = this.config.get('frontendUrl');
    return await this.mailerService.sendMail({
      to: data.to,
      from: 'no-reply@lander.com',
      subject: data.subject,
      template: data.template,
      context: context,
    });
  }
}
