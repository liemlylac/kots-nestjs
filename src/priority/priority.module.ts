import { Module } from '@nestjs/common';
import { PriorityController } from './priority.controller';
import { PriorityResource } from './resources';
import { PriorityService } from './services';

@Module({
  controllers: [PriorityController],
  providers: [PriorityService, PriorityResource],
})
export class PriorityModule {}
