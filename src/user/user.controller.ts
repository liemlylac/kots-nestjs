import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ description: 'Get user data' })
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Request() req) {
    return this.userService.getByUsername(req.user.username);
  }

  @ApiOperation({ description: 'User update self data' })
  @Put('')
  update(@Request() request, @Body() user: UpdateUserDto) {
    return this.userService.update(request.user.userId, user);
  }
}
