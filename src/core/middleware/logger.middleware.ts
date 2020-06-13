import {
  Injectable,
  NestMiddleware,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
  ) {}

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  use(req: Request, res: Response, next: Function) {
    this.loggerService.log(
      `${req.method} ${req.baseUrl}`,
      LoggerMiddleware.name,
    );
    next();
  }
}
