import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestPasswordDTO {
  @ApiProperty({
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;
}
