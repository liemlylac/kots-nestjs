import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty({
    type: String,
    example: 'johndoe@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'doeJohn',
  })
  @IsString()
  password: string;
}
