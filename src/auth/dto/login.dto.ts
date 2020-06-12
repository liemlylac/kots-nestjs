import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty({
    type: String,
    example: 'johndoe',
  })
  @IsString()
  @Matches(/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
  username: string;

  @ApiProperty({
    type: String,
    example: 'doeJohn',
  })
  @IsString()
  password: string;
}
