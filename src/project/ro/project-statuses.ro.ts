import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatusEntity } from '../entities';

export class ProjectStatusesRO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  sortOrder: number;

  constructor(obj: Partial<ProjectStatusEntity>) {
    this.id = obj.id;
    this.name = obj.name;
    this.color = obj.color;
    this.sortOrder = obj.sortOrder;
  }
}
