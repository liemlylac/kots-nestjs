import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Login } from './login.dto';

export class Register extends Login {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsString()
  @Matches(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/)
  fullName: string;
}
