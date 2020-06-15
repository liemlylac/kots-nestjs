import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../services/logger-service';
import { ConfigService } from '@nestjs/config';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  // noinspection JSUnusedGlobalSymbols
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (
      status === 500 &&
      this.configService.get<boolean>('loggingInternalServerError')
    ) {
      this.loggerService.log(
        {
          request: `${request.method} ${request.url}`,
          requestBody: `${JSON.stringify(request.body)}`,
          response: `${status} ${exception.message}`,
        },
        HttpExceptionFilter.name,
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
