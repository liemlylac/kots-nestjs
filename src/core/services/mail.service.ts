import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendMail(data: SendMailData): Promise<SentMessageInfo> {
    const context = { ...data.context };
    context.feUrl = this.configService.get<string>('feUrl');
    return await this.mailerService.sendMail({
      to: data.to,
      from: 'no-reply@kots.com',
      subject: data.subject,
      template: data.template,
      context: context,
    });
  }
}
