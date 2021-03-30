import { Injectable } from '@nestjs/common';

export class PriorityEntity {
  id: number;
  name: string;
}

@Injectable()
export class PriorityResource {
  getList(): Promise<PriorityEntity[]> {
    return Promise.resolve([
      { id: 1, name: 'High' },
      { id: 2, name: 'Normal' },
      { id: 3, name: 'Low' },
    ]);
  }
}
