import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogoutDTO {
  @ApiProperty()
  @IsString()
  deviceId: string;
}
