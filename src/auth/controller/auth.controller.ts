import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBasicAuth, ApiOperation } from '@nestjs/swagger';
import { Login } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { Register } from '../dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBasicAuth()
  @ApiOperation({
    description: 'Basic authentication with username and password',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() login: Login, @Request() request) {
    return this.authService.afterLogin(request.user);
  }

  @Post('register')
  async register(@Body() registerDto: Register) {
    return this.authService.register(registerDto);
  }
}
