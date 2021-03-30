import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { Context, Handler } from 'aws-lambda';
import * as express from 'express';
import { AppModule } from './app.module';

let server: Server;

async function bootstrap() {
  if (!server) {
    const expressServer = express();
    const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressServer),
    );
    app.use(eventContext());
    await app.init();
    server = createServer(expressServer);
  }
  return server;
}

// noinspection JSUnusedGlobalSymbols
export const handler: Handler = async (event: any, context: Context) => {
  server = await bootstrap();
  return proxy(server, event, context, 'PROMISE').promise;
};
