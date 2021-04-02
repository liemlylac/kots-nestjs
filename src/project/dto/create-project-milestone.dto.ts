import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectMilestoneDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
