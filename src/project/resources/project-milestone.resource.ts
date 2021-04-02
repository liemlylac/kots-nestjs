import { EntityRepository, Repository } from 'typeorm';
import { ProjectMilestoneEntity } from '../entities';

@EntityRepository(ProjectMilestoneEntity)
export class ProjectMilestoneResource extends Repository<
  ProjectMilestoneEntity
> {
  getMilestonesByProject(key: string): Promise<ProjectMilestoneEntity[]> {
    return this.find({
      relations: ['project'],
      where: { project: { key: key } },
      order: { endDate: 'DESC' },
    });
  }
}
