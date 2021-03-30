import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PriorityService } from './services';
import { PriorityRO } from './ro/priority.ro';

@ApiTags('Priority')
@ApiBearerAuth()
@Controller('priority')
export class PriorityController {
  constructor(private readonly service: PriorityService) {}

  @ApiOkResponse({ type: PriorityRO, isArray: true })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getList(): Promise<PriorityRO[]> {
    return this.service.getList();
  }
}
