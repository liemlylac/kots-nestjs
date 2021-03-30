import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectIssueTypeDTO {
  @ApiProperty()
  name: string;
}
