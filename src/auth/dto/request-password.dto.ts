import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestPassword {
  @ApiProperty({
    example: 'johndoe@example.com',
  })
  @IsString()
  email: string;
}
