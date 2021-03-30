import { Injectable } from '@nestjs/common';
import { ProjectCategoryResource } from '../resources';
import { ProjectCategoryEntity } from '../entities';

@Injectable()
export class ProjectCategoryService {
  constructor(private readonly resource: ProjectCategoryResource) {}

  getCategory(projectKey: string): Promise<ProjectCategoryEntity[]> {
    return this.resource.getCategoriesByProject(projectKey);
  }
}
