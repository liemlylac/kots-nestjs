import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto{

  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsString()
  displayName: string;

}

