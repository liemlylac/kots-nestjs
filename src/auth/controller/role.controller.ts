import { Controller, Param, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../service/role.service';
import { Role } from '../entity/role.entity';
import { Roles } from '@core/decorator/roles.decorator';

@ApiTags('Auth')
@Controller('role')
@Roles('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    description: 'Get role list',
  })
  @ApiOkResponse({ type: Role, isArray: true })
  @Roles('read')
  @Get()
  getList() {
    return this.roleService.getList();
  }

  @ApiOperation({
    description: 'Get permission',
  })
  @ApiOkResponse({ type: Role })
  @Roles('read:detail')
  @Get('getPermission/:role')
  getPermission(@Param('role') role: string) {
    return this.roleService.getPermission(role);
  }
}
