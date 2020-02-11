import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');

  app.enableCors();

  /**
   * Swagger Api code block
   */
  const options = new DocumentBuilder()
    .setTitle('Kots Software')
    .setDescription('The #100 software development tool used by agile teams')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(serverConfig.port);
  logger.log(`Application listening on port ${serverConfig.port}`);
}
bootstrap();
