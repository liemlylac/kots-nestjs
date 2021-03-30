import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty()
  @IsString()
  projectKey: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  chartEnable: boolean;

  @ApiProperty()
  @IsBoolean()
  subtaskEnable: boolean;

  @ApiProperty()
  @IsString()
  textFormattingRule: string;
}
