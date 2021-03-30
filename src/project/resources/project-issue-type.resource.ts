import { EntityRepository, Repository } from 'typeorm';
import { ProjectIssueTypeEntity } from '../entities';

@EntityRepository(ProjectIssueTypeEntity)
export class ProjectIssueTypeResource extends Repository<
  ProjectIssueTypeEntity
> {
  getIssueTypesByProject(key: string): Promise<ProjectIssueTypeEntity[]> {
    return this.find({
      relations: ['project'],
      where: { project: { projectKey: key } },
      order: { sortOrder: 'ASC' },
    });
  }
}
