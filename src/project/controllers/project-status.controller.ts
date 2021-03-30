import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProjectStatusDTO, UpdateProjectStatusDTO } from '../dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Project Status')
@ApiBearerAuth()
@Controller('project/:projectKey/status')
export class ProjectStatusController {
  @Get('')
  getProjectStatus(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Post('')
  addProjectStatus(
    @Param('projectKey') projectKey: string,
    @Body() data: CreateProjectStatusDTO,
  ) {
    return { ...data, projectKey: projectKey };
  }

  @Patch(':id')
  updateProjectStatus(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
    @Body() data: UpdateProjectStatusDTO,
  ) {
    return { id, ...data, projectKey: projectKey };
  }

  @Delete(':id')
  deleteProjectStatus(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
  ) {
    return projectKey;
  }
}
