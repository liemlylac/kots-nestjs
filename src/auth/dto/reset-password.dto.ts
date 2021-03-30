import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Confirm } from '@app/common';

export class ResetPasswordDTO {
  @ApiProperty({ example: 'doeJohn@123' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 'doeJohn@123' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Confirm('password')
  confirmPassword: string;
}
