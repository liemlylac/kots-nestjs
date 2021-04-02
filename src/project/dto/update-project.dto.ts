import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProjectDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
