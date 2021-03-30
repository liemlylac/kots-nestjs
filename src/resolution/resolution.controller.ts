import { Controller, Get, UseGuards } from '@nestjs/common';
import { ResolutionService } from './services';
import { ResolutionEntity } from './resources';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Resolution')
@ApiBearerAuth()
@Controller('resolution')
export class ResolutionController {
  constructor(private readonly service: ResolutionService) {}

  @ApiOkResponse({ isArray: true, type: ResolutionEntity })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getList(): Promise<ResolutionEntity[]> {
    return this.service.getList();
  }
}
