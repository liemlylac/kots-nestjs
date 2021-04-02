import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProjectIssueTypeDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
