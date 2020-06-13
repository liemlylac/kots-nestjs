import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './core/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger: console,
    logger: WinstonModule.createLogger({
      format: winston.format.json(),
      defaultMeta: { service: 'bootstrap' },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        }),
        new winston.transports.File({
          filename: __dirname + '/log/error.log',
          level: 'error',
        }), // - Write all logs with level `error` and below to `error.log`
        new winston.transports.File({
          filename: __dirname + '/log/combined.log',
        }),
        // - Write all logs with level `info` and below to `combined.log`
      ],
    }),
    cors: true,
  });

  const configService = app.get(ConfigService);

  /**
   * Swagger Api code block
   */
  if (configService.get<boolean>('enableSwagger')) {
    const options = new DocumentBuilder()
      .setTitle('Kots Software')
      .setDescription('The #100 software development tool used by agile teams')
      .setVersion('0.0.1')
      .setContact('Liem Vo', null, 'liemlylac@gmail.com')
      .addBasicAuth()
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(configService.get<string>('apiRoot'), app, document);
  }

  await app.listen(configService.get<number>('port'));
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
