import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Login {
  @ApiProperty({
    type: String,
    example: 'johndoe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    example: 'doeJohn',
  })
  @IsString()
  password: string;
}

