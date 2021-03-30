import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectIssueTypeDTO, UpdateProjectIssueTypeDTO } from '../dto';
import { ProjectCategoryService } from '../services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Project Category')
@ApiBearerAuth()
@Controller('project/:projectKey/category')
export class ProjectCategoryController {
  constructor(protected readonly service: ProjectCategoryService) {}
  @Get('')
  getProjectCategory(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Post('')
  addProjectCategory(
    @Param('projectKey') projectKey: string,
    @Body() data: CreateProjectIssueTypeDTO,
  ) {
    return projectKey;
  }

  @Patch(':id')
  updateProjectCategory(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
    @Body() data: UpdateProjectIssueTypeDTO,
  ) {
    return projectKey;
  }

  @Delete(':id')
  deleteProjectCategory(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
  ) {
    return projectKey;
  }
}
