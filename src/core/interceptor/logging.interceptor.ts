import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { LoggerService } from '../services/logger-service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param context
   * @param next
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const host = context.switchToHttp();
    const request = host.getRequest<Request>();
    const response = host.getResponse<Response>();
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.loggerService.log(
          `${request.method} ${request.url} ${
            response.statusCode
          } ${Date.now() - start}ms`,
          LoggingInterceptor.name,
        );
      }),
    );
  }
}
