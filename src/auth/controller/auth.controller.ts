import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Query,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Login } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { Register } from '../dto/register.dto';
import { LoginResult } from '../ro/login.ro';
import { ResetPassword } from '../dto/reset-password.dto';
import { RequestPassword } from '../dto/request-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Basic authentication with username and password',
  })
  @ApiCreatedResponse({ type: LoginResult })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() login: Login, @Request() request) {
    return this.authService.afterLogin(request.user);
  }

  @ApiOperation({
    description: 'Register a new user account',
  })
  @ApiCreatedResponse({ type: LoginResult })
  @Post('register')
  async register(@Body() registerDto: Register): Promise<LoginResult> {
    return this.authService.register(registerDto);
  }

  @ApiOkResponse({ type: '' })
  @ApiBody({
    type: RequestPassword,
  })
  @Post('request-password')
  async requestPassword(@Body('email') email: string) {
    return await this.authService.requestPassword(email);
  }

  @ApiQuery({
    name: 'token',
    type: String,
  })
  @Get('verify-reset-password-token')
  async verifyResetPasswordToken(@Query('token') token) {
    await this.authService.verifyResetPasswordToken(token);
  }

  @ApiOkResponse({ type: '' })
  @ApiQuery({
    name: 'token',
    type: String,
  })
  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body(new ValidationPipe()) data: ResetPassword,
  ) {
    await this.authService.resetPassword(token, data);
  }
}
