import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectIssueTypeDTO {
  @ApiProperty()
  name: string;
}
