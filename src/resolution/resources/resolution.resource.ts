import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResolutionEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

@Injectable()
export class ResolutionResource {
  getList(): Promise<ResolutionEntity[]> {
    return Promise.resolve([
      { id: 1, name: 'Fixed' },
      { id: 2, name: "Won't Fix" },
      { id: 3, name: 'Invalid' },
      { id: 4, name: 'Duplication' },
      { id: 5, name: 'Cannot Reproduce' },
    ]);
  }
}
