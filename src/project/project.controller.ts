import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() project: Project): Promise<Project> {
    return this.projectService.create(project);
  }

  @Put()
  update(@Body() project: Project) {
    return this.projectService.update(project);
  }

  @Delete(':id')
  delete(@Param('id')id: number) {
    return this.projectService.delete(id);
  }
}
