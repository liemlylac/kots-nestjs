import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, MaxLength } from 'class-validator';

export class CreateSpaceDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(36)
  domain: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(2, 3)
  lang: string;

  @ApiProperty()
  @IsString()
  timezone: string;
}
