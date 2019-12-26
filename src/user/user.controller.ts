import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDto } from './dto/user.create.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UserCreateRo } from './ro/user.create.ro';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  getProfile(@Request() req) {
    return this.userService.findByUsername(req.user.username);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiCreatedResponse({type: UserCreateRo})
  @Post()
  create(@Body() userCreateDto: UserCreateDto): Promise<UserEntity> {
    return this.userService.create(userCreateDto);
  }

  @Put()
  update(@Body() user: UserEntity) {
    return this.userService.update(user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
