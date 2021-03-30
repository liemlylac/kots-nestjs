import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectCategoryDTO {
  @ApiProperty()
  name: string;
}
