import { ApiProperty } from '@nestjs/swagger';
import { PriorityEntity } from '../resources';

export class PriorityRO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(obj: Partial<PriorityEntity>) {
    this.id = obj.id;
    this.name = obj.name;
  }
}
