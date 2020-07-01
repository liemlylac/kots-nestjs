import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../services/logger-service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  use(req: Request, res: Response, next: Function) {
    this.loggerService.log(
      `Request ${req.method} ${req.baseUrl}`,
      LoggerMiddleware.name,
    );
    next();
  }
}
