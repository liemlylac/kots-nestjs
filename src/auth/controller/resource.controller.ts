import { Get, Controller } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@core/decorator/roles.decorator';
import { Resource } from '../entity/resource.entity';
import { ResourceService } from '../service/resource.service';

@ApiTags('Auth')
@Roles('resource')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @ApiOperation({
    description: 'Get resource list',
  })
  @ApiOkResponse({ type: Resource, isArray: true })
  @Roles('read')
  @Get()
  getList() {
    return this.resourceService.getList();
  }
}
