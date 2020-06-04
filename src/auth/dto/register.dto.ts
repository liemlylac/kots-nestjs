import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Login } from './login.dto';

export class Register extends Login{

  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsString()
  displayName: string;

}

