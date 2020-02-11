import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @ApiCreatedResponse()
  @ApiConflictResponse()
  @Post('/signup')
  signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
    return this.authService.signin(authCredentialsDto);
  }
}
