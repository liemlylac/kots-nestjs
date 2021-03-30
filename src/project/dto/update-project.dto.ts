import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDTO {
  @ApiProperty()
  name: string;
}
