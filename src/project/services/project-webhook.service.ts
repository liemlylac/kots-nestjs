import { Injectable } from '@nestjs/common';
import { ProjectWebhookResource } from '../resources';
import { ProjectWebhookEntity } from '../entities/project-webhook.entity';

@Injectable()
export class ProjectWebhookService {
  constructor(private readonly resource: ProjectWebhookResource) {}

  getWebhooks(projectKey: string): Promise<ProjectWebhookEntity[]> {
    return this.resource.getWebhooksByProject(projectKey);
  }
}
