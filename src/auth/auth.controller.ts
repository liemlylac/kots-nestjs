import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Login } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Register } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() login: Login, @Request() request) {
    return this.authService.login(request.user);
  }

  @Post('register')
  async register(@Body() registerDto: Register) {
    return this.authService.register(registerDto);
  }
}
