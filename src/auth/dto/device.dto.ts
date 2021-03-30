import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeviceDTO {
  @ApiProperty({ example: 'unknown' })
  @IsString()
  deviceType: string;

  @ApiProperty({ example: 'unknown' })
  @IsString()
  deviceOs: string;

  @ApiProperty({ example: 'unknown' })
  @IsString()
  deviceInfo: string;
}
