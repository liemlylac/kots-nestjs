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
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBody,
} from '@nestjs/swagger';
import { LoggerService } from '@core/services/logger-service';
import { UserService } from '../service/user.service';
import { UpdateUser } from '../dto/update-user.dto';
import { User } from '../entity/user.entity';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly userService: UserService,
  ) {
    this.loggerService.log('construct', UserController.name);
  }

  @ApiOperation({ description: 'Get user data' })
  @ApiOkResponse({ type: User })
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getByUsername(req.user.username);
  }

  @ApiOperation({ description: 'User update self data' })
  @ApiNoContentResponse({ description: 'Api will response empty body' })
  @ApiBody({ type: UpdateUser })
  @Put('')
  @HttpCode(204)
  update(
    @Request() request,
    @Body(new ValidationPipe()) user: Partial<UpdateUser>,
  ) {
    return this.userService.update(request.user.id, user);
  }
}
