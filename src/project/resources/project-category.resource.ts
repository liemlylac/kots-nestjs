import { EntityRepository, Repository } from 'typeorm';
import { ProjectCategoryEntity } from '../entities';

@EntityRepository(ProjectCategoryEntity)
export class ProjectCategoryResource extends Repository<ProjectCategoryEntity> {
  getCategoriesByProject(key: string): Promise<ProjectCategoryEntity[]> {
    return this.find({
      relations: ['project'],
      where: { project: { key: key } },
      order: { sortOrder: 'ASC' },
    });
  }
}
