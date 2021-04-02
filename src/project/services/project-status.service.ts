import { Injectable } from '@nestjs/common';
import { ProjectStatusEntity } from '../entities';
import { ProjectStatusResource } from '../resources';

@Injectable()
export class ProjectStatusService {
  constructor(private readonly resource: ProjectStatusResource) {}

  getProjectStatuses(projectKey: string): Promise<ProjectStatusEntity[]> {
    return this.resource.getStatusesByProject(projectKey);
  }
}
