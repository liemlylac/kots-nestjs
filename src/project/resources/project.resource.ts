import { EntityRepository, Repository } from 'typeorm';
import { ProjectEntity } from '../entities';
import { prepareProjectOptions } from './helper.resourse';

@EntityRepository(ProjectEntity)
export class ProjectResource extends Repository<ProjectEntity> {
  getProjectsBySpace(spaceKey: string) {
    return this.find({
      relations: ['space'],
      where: {
        space: { key: spaceKey }
      }
    });
  }

  getProjectByIdOrKey(spaceKey: string, projectIdOrKey: number | string): Promise<ProjectEntity> {
    return this.findOne({ where: prepareProjectOptions(spaceKey, projectIdOrKey) });
  }
}
