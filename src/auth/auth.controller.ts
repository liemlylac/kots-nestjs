import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { defaultValidationPipeOption } from '@app/common';
import {
  EmailDTO,
  LoginDTO,
  RegisterDTO,
  RequestPasswordDTO,
  ResetPasswordDTO,
  RefreshTokenDTO,
} from './dto';
import { AuthService } from './services';
import { LoginResultRO } from './ro';

@ApiTags('Auth')
@UsePipes(new ValidationPipe(defaultValidationPipeOption))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: LoginResultRO })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() body: LoginDTO, @Request() request): Promise<LoginResultRO> {
    return this.authService.login(request.user);
  }

  @ApiCreatedResponse({ type: LoginResultRO })
  @Post('register')
  register(@Body() body: RegisterDTO): Promise<LoginResultRO> {
    return this.authService.register(body);
  }

  @ApiCreatedResponse({ type: EmailDTO })
  @Post('request-password')
  requestPassword(@Body() body: RequestPasswordDTO) {
    return this.authService.requestPassword(body.email);
  }

  @ApiOkResponse({ type: Boolean })
  @ApiQuery({ name: 'token' })
  @Get('verify-reset-password-token')
  verifyResetPasswordToken(@Query('token') token) {
    return this.authService.verifyResetPasswordToken(token);
  }

  @ApiCreatedResponse({ type: EmailDTO })
  @ApiQuery({ name: 'token' })
  @Post('reset-password')
  async resetPassword(@Query('token') token, @Body() body: ResetPasswordDTO) {
    return await this.authService.resetPassword(token, body);
  }

  @ApiCreatedResponse({ type: RefreshTokenDTO })
  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDTO) {
    return await this.authService.refreshToken(body);
  }

  @ApiNoContentResponse({ description: 'Logout success without body response' })
  @ApiBearerAuth()
  @ApiParam({ name: 'deviceId' })
  @UseGuards(AuthGuard('jwt'))
  @Delete('logout/:deviceId')
  async logout(
    @Request() req,
    @Param('deviceId') deviceId: string,
  ): Promise<void> {
    return this.authService.logout(req.user.id, deviceId);
  }
}
