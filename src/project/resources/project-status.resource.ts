import { EntityRepository, Repository } from 'typeorm';
import { ProjectStatusEntity } from '../entities';

@EntityRepository(ProjectStatusEntity)
export class ProjectStatusResource extends Repository<ProjectStatusEntity> {
  getStatusesByProject(key: string): Promise<ProjectStatusEntity[]> {
    return this.find({
      relations: ['project'],
      where: { project: { key: key } },
      order: { sortOrder: 'ASC' },
    });
  }
}
