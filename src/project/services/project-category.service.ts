import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProjectCategoryResource } from '../resources';
import { ProjectCategoryEntity, ProjectIdOrKey } from '../entities';
import { CreateProjectCategoryDTO, UpdateProjectCategoryDTO } from '../dto';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectCategoryService {
  private readonly logger = new Logger(ProjectCategoryService.name);

  constructor(
    private readonly projectService: ProjectService,
    private readonly resource: ProjectCategoryResource,
  ) {
  }

  async getOneOrFail(spaceKey: string, projectIdOrKey: ProjectIdOrKey, id: number): Promise<ProjectCategoryEntity> {
    const category = await this.resource.getOne(spaceKey, projectIdOrKey, id);
    if (!category) {
      throw new NotFoundException('Category not found.')
    }
    return category;
  }

  getCategories(spaceKey: string, projectIdOrKey: ProjectIdOrKey): Promise<ProjectCategoryEntity[]> {
    return this.resource.getCategoriesByProject(spaceKey, projectIdOrKey);
  }

  async addCategory(spaceKey: string, projectKey: ProjectIdOrKey, data: CreateProjectCategoryDTO) {
    const project = await this.projectService.getOneOrFail(spaceKey, projectKey);
    try {
      const newCategory = this.resource.create(data);
      newCategory.projectId = project.id;
      return await this.resource.save(newCategory);
    } catch (e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async updateCategory(spaceKey: string, projectIdOrKey: ProjectIdOrKey, id: number, data: UpdateProjectCategoryDTO) {
    const project = await this.projectService.getOneOrFail(spaceKey, projectIdOrKey);
    const category = await this.getOneOrFail(spaceKey, projectIdOrKey, id);
    try {
      const newCategory = this.resource.merge(category, data);
      return await this.resource.save(newCategory);
    } catch (e) {
      this.logger.error(e.message, e.stack);
    }
  }

  async deleteCategory(spaceKey: string, projectIdOrKey: ProjectIdOrKey, id: number) {

  }
}
