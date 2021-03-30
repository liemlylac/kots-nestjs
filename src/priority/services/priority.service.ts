import { Injectable } from '@nestjs/common';
import { PriorityResource } from '../resources';
import { PriorityRO } from '../ro/priority.ro';

@Injectable()
export class PriorityService {
  constructor(private readonly resource: PriorityResource) {}

  getList(): Promise<PriorityRO[]> {
    return this.resource
      .getList()
      .then(list => list.map(p => new PriorityRO(p)));
  }
}
