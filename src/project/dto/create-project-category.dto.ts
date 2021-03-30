import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectCategoryDTO {
  @ApiProperty()
  name: string;
}
