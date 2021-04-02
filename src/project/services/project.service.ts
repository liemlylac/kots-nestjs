import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProjectResource } from '../resources';
import { ProjectStatusResource } from '../resources';
import { CreateProjectDTO } from '../dto';
import { ProjectStatusesRO } from '../ro';
import { ProjectEntity } from '../entities';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    private readonly resource: ProjectResource,
    private readonly statusResource: ProjectStatusResource,
  ) {
  }

  async getOne(spaceKey: string, projectIdOrKey: number | string) {
    return await this.resource.getProjectByIdOrKey(spaceKey, projectIdOrKey);
  }

  async getOneOrFail(spaceKey: string, projectIdOrKey: number | string): Promise<ProjectEntity | never> {
    const project = this.getOne(spaceKey, projectIdOrKey);
    if (!project) {
      throw new NotFoundException('Project not found.');
    }
    return project;
  }

  getStatusesList(projKey: string) {
    return this.statusResource
      .getStatusesByProject(projKey)
      .then(list => list.map(s => new ProjectStatusesRO(s)));
  }

  getProjectsList(space: string) {
    return this.resource.getProjectsBySpace(space);
  }

  async createProject(space: string, data: CreateProjectDTO) {
    try {
      const newProject = this.resource.create(data);
      newProject.spaceKey = space;
      return await this.resource.save(newProject);
    } catch (e) {
      this.logger.error(e.message, e.stack);
    }
  }
}
