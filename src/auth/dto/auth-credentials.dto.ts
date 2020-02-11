import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  @MinLength(6)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'Password is too weak' },
  )
  password: string;
}
