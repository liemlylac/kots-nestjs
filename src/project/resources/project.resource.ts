import { EntityRepository, Repository } from 'typeorm';
import { ProjectEntity } from '../entities';

@EntityRepository(ProjectEntity)
export class ProjectResource extends Repository<ProjectEntity> {
  getProjectBySpace(space: string) {
    return this.find({ spaceKey: space });
  }
}
