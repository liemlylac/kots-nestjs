import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSpaceInfoDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lang: string;

  @ApiProperty()
  @IsString()
  timezone: string;
}
