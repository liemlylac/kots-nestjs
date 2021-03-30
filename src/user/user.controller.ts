import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './services';
import { ReqUser } from '@app/common';
import { UserProfileType } from './ro';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(@ReqUser() user) {
    return this.userService.mapProfile(user, UserProfileType.Profile);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.userService.getDetail(id);
  }
}
