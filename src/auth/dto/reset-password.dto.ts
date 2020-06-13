import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPassword {
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  confirmPassword: string;
}
