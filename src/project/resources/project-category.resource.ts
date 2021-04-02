import { EntityRepository, Repository } from 'typeorm';
import { ProjectCategoryEntity } from '../entities';
import { prepareProjectOptions } from './helper.resourse';


@EntityRepository(ProjectCategoryEntity)
export class ProjectCategoryResource extends Repository<ProjectCategoryEntity> {
  getCategoriesByProject(spaceKey: string, projectIdOrKey: number | string): Promise<ProjectCategoryEntity[]> {
    return this.find({
      relations: ['project'],
      where: { project: prepareProjectOptions(spaceKey, projectIdOrKey) },
      order: { sortOrder: 'ASC' },
    });
  }

  getOne(spaceKey: string, projectIdOrKey: number | string, id: number): Promise<ProjectCategoryEntity> {
    return this.findOne({
      relations: ['project'],
      where: {
        id: id,
        project: prepareProjectOptions(spaceKey, projectIdOrKey),
      },
      order: { sortOrder: 'ASC' },
    })
  }
}
