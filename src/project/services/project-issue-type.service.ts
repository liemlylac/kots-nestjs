import { Injectable } from '@nestjs/common';
import { ProjectIssueTypeResource } from '../resources';

@Injectable()
export class ProjectIssueTypeService {
  constructor(private readonly resource: ProjectIssueTypeResource) {}

  getIssueTypes(projectKey: string) {
    return this.resource.getIssueTypesByProject(projectKey);
  }
}
