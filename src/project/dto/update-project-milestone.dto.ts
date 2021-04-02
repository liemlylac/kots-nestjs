import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProjectMilestoneDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
