import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services';

@Injectable()
export class ProjectMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ProjectMiddleware.name);
  constructor(
    private readonly projectService: ProjectService,
  ) {
  }

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Project Requesting...');
    next();
  }
}