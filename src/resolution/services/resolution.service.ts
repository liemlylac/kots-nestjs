import { Injectable } from '@nestjs/common';
import { ResolutionEntity, ResolutionResource } from '../resources';
import { ResolutionRO } from '../ro';

@Injectable()
export class ResolutionService {
  constructor(private readonly resource: ResolutionResource) {}

  getList(): Promise<ResolutionEntity[]> {
    return this.resource
      .getList()
      .then(list => list.map(resolution => new ResolutionRO(resolution)));
  }
}
