import { ApiProperty } from '@nestjs/swagger';
import { ResolutionEntity } from '../resources';

export class ResolutionRO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(obj: Partial<ResolutionEntity>) {
    this.id = obj.id;
    this.name = obj.name;
  }
}
