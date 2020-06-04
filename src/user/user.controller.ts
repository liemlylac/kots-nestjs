import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUser } from './dto/update-user.dto';
import { User } from './user.entity';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ description: 'Get user data' })
  @ApiOkResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getByUsername(req.user.username);
  }

  @ApiOperation({ description: 'User update self data' })
  @ApiNoContentResponse({ description: 'Api will response empty body' })
  @Put('')
  @HttpCode(204)
  update(@Request() request,@Body() user: UpdateUser) {
    return this.userService.update(request.user.userId, user);
  }
}
