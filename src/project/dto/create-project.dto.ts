import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'markdown' })
  @IsString()
  textFormattingRule: string;
}
