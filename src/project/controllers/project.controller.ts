import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectService } from '../services';
import { CreateProjectDTO } from '../dto';

@ApiTags('Project')
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOkResponse()
  @ApiHeader({ name: 'x-kots-space' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProjectsList(@Headers('x-kots-space') space: string) {
    return this.projectService.getProjectsList(space);
  }

  @ApiHeader({ name: 'x-kots-space' })
  //@UseGuards(AuthGuard('jwt'))
  @Post()
  createProject(
    @Body() data: CreateProjectDTO,
    @Headers('x-kots-space') space: string,
  ) {
    return this.projectService.createProject(space, data);
  }

  @Get(':projectKey')
  getProject(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Patch(':projectKey')
  updateProject(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Delete(':projectKey')
  deActiveProject(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Get(':projectKey/user')
  getProjectUser(@Param('projectKey') projectKey: string) {
    return projectKey;
  }

  @Post(':projectKey/user')
  addProjectUser(
    @Param('projectKey') projectKey: string,
    @Body('userId') userId: string,
  ) {
    return projectKey;
  }

  @Delete(':projectKey/user')
  removeProjectUser(
    @Param('projectKey') projectKey: string,
    @Body('userId') userId: string,
  ) {
    return projectKey;
  }

  @Get(':projectKey/admin')
  getProjectAdmin(
    @Param('projectKey') projectKey: string,
    @Body('userId') userId: string,
  ) {
    return projectKey;
  }

  @Post(':projectKey/admin')
  addProjectAdmin(
    @Param('projectKey') projectKey: string,
    @Body('userId') userId: string,
  ) {
    return projectKey;
  }

  @Delete(':projectKey/admin')
  removeProjectAdmin(
    @Param('projectKey') projectKey: string,
    @Body('userId') userId: string,
  ) {
    return projectKey;
  }
}
