import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();

  /**
   * Swagger Api code block
   */
  const options = new DocumentBuilder()
    .setTitle('Kots Software')
    .setDescription('The #100 software development tool used by agile teams')
    .setVersion('0.0.1')
    .setContact('Liem Vo', null, 'liemlylac@gmail.com')
    .addBasicAuth()
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('port'));
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
