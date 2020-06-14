import { ConfigService } from '@nestjs/config';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  LoggerService,
} from '@nestjs/common';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as nodeMailer from 'nodemailer';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CONFIG } from '../../config';

@Injectable()
export class MailConfigService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
  ) {}

  // noinspection JSUnusedGlobalSymbols
  /**
   * Create mailer options using ConfigService
   */
  async createMailerOptions(): Promise<MailerOptions> {
    return {
      transport: await this.getTransport(
        this.configService.get<boolean>('mail.preview'),
      ),
      defaults: {
        from: `"Kots Nestjs" <kots-nestjs@example.com>`, // outgoing email ID
      },
      preview: this.configService.get<boolean>('mail.preview'),
      template: {
        dir: path.join(process.cwd(), 'templates/pages'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: path.join(process.cwd(), 'templates/partials'),
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
          user: this.configService.get<string>('mail.dev.user'),
          pass: this.configService.get<string>('mail.dev.pass'),
        },
      };
    }

    const transport = {
      host: this.configService.get<string>('mail.host'),
      port: this.configService.get<string>('mail.port'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('mail.auth.user'),
        pass: this.configService.get<string>('mail.auth.pass'),
      },
    };

    if (CONFIG.MAIL.VERIFY_SMTP_CONFIG) {
      await this.verifyConnectionConfiguration(transport)
        .then(success => {
          this.loggerService.log(
            `Config SMTP email at ${transport.host}:${transport.port} - ${success}`,
            MailConfigService.name,
          );
        })
        .catch(error => {
          this.loggerService.error(
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
