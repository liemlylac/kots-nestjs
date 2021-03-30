import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

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
        this.logger.log(
          `Response ${request.method} ${request.url} with status code ${
            response.statusCode
          } in ${Date.now() - start}ms`,
        );
      }),
    );
  }
}
