import { Module } from '@nestjs/common';
import { ResolutionController } from './resolution.controller';
import { ResolutionService } from './services';
import { ResolutionResource } from './resources';

@Module({
  controllers: [ResolutionController],
  providers: [ResolutionService, ResolutionResource],
})
export class ResolutionModule {}
