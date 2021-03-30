import { ApiProperty } from '@nestjs/swagger';
import { SpaceEntity } from '../entities';

export class SpaceRO {
  @ApiProperty()
  key: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lang: string;

  @ApiProperty()
  timezone: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  updated: Date;

  constructor(obj: Partial<SpaceEntity>) {
    this.key = obj.key;
    this.name = obj.name;
    this.lang = obj.lang;
    this.timezone = obj.timezone;
    this.created = obj.created;
    this.updated = obj.updated;
  }
}
