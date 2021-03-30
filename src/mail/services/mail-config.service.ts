import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as path from 'path';
import { CONFIG } from '../../config';
import { mailConfig, MailConfig } from '../mail.config';

@Injectable()
export class MailConfigService {
  private readonly logger = new Logger(MailConfigService.name);

  constructor(
    @Inject(mailConfig.KEY)
    private readonly mailConfig: MailConfig,
  ) {}

  // noinspection JSUnusedGlobalSymbols
  /**
   * Create mailer options using ConfigService
   */
  async createMailerOptions(): Promise<MailerOptions> {
    return {
      transport: await this.getTransport(this.mailConfig.preview),
      defaults: {
        from: `"Lander" <lander-nestjs@example.com>`, // outgoing email ID
      },
      preview: this.mailConfig.preview,
      template: {
        dir: path.join(process.cwd(), 'dist/mail/templates/pages'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: path.join(process.cwd(), 'dist/mail/templates/partials'),
          options: {
            strict: true,
          },
        },
      },
    };
  }

  protected async getTransport(isPreviewMode: boolean) {
    if (isPreviewMode) {
      return {
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: this.mailConfig.dev.user,
          pass: this.mailConfig.dev.pass,
        },
      };
    }

    const transport = {
      host: this.mailConfig.host,
      port: this.mailConfig.port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.mailConfig.auth.user,
        pass: this.mailConfig.auth.pass,
      },
    };

    if (CONFIG.MAIL.VERIFY_SMTP_CONFIG) {
      await this.verifyConnectionConfiguration(transport)
        .then(success => {
          this.logger.log(
            `Config SMTP email at ${transport.host}:${transport.port} - ${success}`,
            MailConfigService.name,
          );
        })
        .catch(error => {
          this.logger.error(
            `Config SMTP email: ${error}`,
            MailConfigService.name,
          );
          throw new InternalServerErrorException();
        });
    }
    return transport;
  }

  private async verifyConnectionConfiguration(transport: SMTPTransport) {
    const transporter = nodeMailer.createTransport(transport);
    return new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error);
        } else {
          resolve(success);
        }
      });
    });
  }
}
