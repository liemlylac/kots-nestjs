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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Project Issue type')
@ApiBearerAuth()
@Controller('project/:projectKey/issueType')
export class ProjectIssueTypeController {
  @Get('')
  getProjectIssueType(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Post(':projectKey/issueType')
  addProjectIssueType(
    @Param('projectKey') projectKey: string,
    @Body() data: CreateProjectIssueTypeDTO,
  ) {
    return projectKey;
  }

  @Patch(':projectKey/issueType/:id')
  updateProjectIssueType(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
    @Body() data: UpdateProjectIssueTypeDTO,
  ) {
    return projectKey;
  }

  @Delete(':projectKey/issueType/:id')
  deleteProjectIssueType(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
  ) {
    return projectKey;
  }
}
