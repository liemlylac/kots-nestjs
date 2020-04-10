import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() login: LoginDto, @Request() request) {
    return this.authService.login(request.user);
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
