import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProjectWebhookDTO, UpdateProjectWebhookDTO } from '../dto';

@ApiTags('Project Webhook')
@ApiBearerAuth()
@Controller('project/:projectKey/webhook')
export class ProjectWebhookController {
  @Get('')
  getProjectStatus(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Post('')
  addProjectStatus(
    @Param('projectKey') projectKey: string,
    @Body() data: CreateProjectWebhookDTO,
  ) {
    return { projectKey: projectKey, ...data };
  }

  @Patch(':id')
  updateProjectStatus(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
    @Body() data: UpdateProjectWebhookDTO,
  ) {
    return { id, projectKey: projectKey, ...data };
  }

  @Delete(':id')
  deleteProjectStatus(
    @Param('projectKey') projectKey: string,
    @Param('id') id: number,
  ) {
    return { id, projectKey: projectKey };
  }
}
