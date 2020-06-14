import { WinstonModuleOptionsFactory, utilities } from 'nest-winston';
import { LoggerOptions } from 'winston';
import winston = require('winston');

export class WinstonConfigService implements WinstonModuleOptionsFactory {
  // noinspection JSUnusedGlobalSymbols
  /**
   * Create logger options for winston
   */
  createWinstonModuleOptions(): LoggerOptions {
    return {
      format: winston.format.json(),
      defaultMeta: { service: 'system-service' },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        }),
        new winston.transports.File({
          filename: process.cwd() + '/log/error.log',
          level: 'error',
        }), // - Write all logs with level `error` and below to `error.log`
        new winston.transports.File({
          filename: process.cwd() + '/log/combined.log',
        }),
        // - Write all logs with level `info` and below to `combined.log`
      ],
    };
  }
}
