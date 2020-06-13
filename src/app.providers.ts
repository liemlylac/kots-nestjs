import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { LoggingInterceptor } from './core/interceptor/logging.interceptor';
import { TimeoutInterceptor } from './core/interceptor/timeout.interceptor';

export const providers = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },
];
