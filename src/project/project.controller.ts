import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Post()
  create(@Body() project: Project): Promise<Project> {
    return this.projectService.create(project);
  }

  @Put(':id')
  update(@Body() project: Project) {
    return this.projectService.update(project);
  }

  @Delete(':id')
  delete(@Param('id')id: number) {
    return this.projectService.delete(id);
  }
}
