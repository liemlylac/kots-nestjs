import { Injectable, Logger } from '@nestjs/common';
import { ProjectResource } from '../resources';
import { ProjectStatusResource } from '../resources';
import { CreateProjectDTO } from '../dto';
import { ProjectStatusesRO } from '../ro';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);
  constructor(
    private readonly resource: ProjectResource,
    private readonly statusResource: ProjectStatusResource,
  ) {}

  getStatusesList(projKey: string) {
    return this.statusResource
      .getStatusesByProject(projKey)
      .then(list => list.map(s => new ProjectStatusesRO(s)));
  }

  getProjectsList(space: string) {
    return this.resource.getProjectBySpace(space);
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
