import { EntityRepository, Repository } from 'typeorm';
import { ProjectWebhookEntity } from '../entities/project-webhook.entity';

@EntityRepository(ProjectWebhookEntity)
export class ProjectWebhookResource extends Repository<ProjectWebhookEntity> {
  getWebhooksByProject(key: string): Promise<ProjectWebhookEntity[]> {
    return this.find({
      relations: ['project'],
      where: { project: { projectKey: key } },
      order: { sortOrder: 'ASC' },
    });
  }
}
