import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectMilestoneDTO, UpdateProjectMilestoneDTO } from '../dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Project Milestone')
@ApiBearerAuth()
@Controller('project/:projectKey/milestone')
export class ProjectMilestoneController {
  @Get('')
  getProjectCategory(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Post('')
  addProjectCategory(
    @Param('projectKey') projectKey: string,
    @Body() data: CreateProjectMilestoneDTO,
  ) {
    return projectKey;
  }

  @Patch(':id')
  updateProjectCategory(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
    @Body() data: UpdateProjectMilestoneDTO,
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
