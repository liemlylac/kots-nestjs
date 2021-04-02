import {
  Body,
  Controller,
  Delete,
  Get, Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateProjectCategoryDTO,
  UpdateProjectCategoryDTO,
} from '../dto';
import { ProjectCategoryService } from '../services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectIdOrKey } from '../entities';

@ApiTags('Project Category')
@ApiBearerAuth()
@Controller('project/:projectKey/category')
export class ProjectCategoryController {
  constructor(protected readonly service: ProjectCategoryService) {}
  @Get('')
  getProjectCategory(
    @Headers('spaceKey') spaceKey: string,
    @Param('projectKey') projectIdOrKey: ProjectIdOrKey) {
    return this.service.getCategories(spaceKey, projectIdOrKey);
  }

  @Post('')
  addProjectCategory(
    @Headers('spaceKey') spaceKey: string,
    @Param('projectKey') projectIdOrKey: ProjectIdOrKey,
    @Body() data: CreateProjectCategoryDTO,
  ) {
    return this.service.addCategory(spaceKey, projectIdOrKey, data);
  }

  @Patch(':id')
  updateProjectCategory(
    @Headers('spaceKey') spaceKey: string,
    @Param('projectKey') projectIdOrKey: ProjectIdOrKey,
    @Param('id') id: number,
    @Body() data: UpdateProjectCategoryDTO,
  ) {
    return this.service.updateCategory(spaceKey, projectIdOrKey, id, data);
  }

  @Delete(':id')
  deleteProjectCategory(
    @Headers('spaceKey') spaceKey: string,
    @Param('projectKey') projectIdOrKey: ProjectIdOrKey,
    @Param('id') id: number,
  ) {
    return this.service.deleteCategory(spaceKey, projectIdOrKey, id);
  }
}
