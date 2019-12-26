import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectEntity } from './project.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  findAll(): Promise<ProjectEntity[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProjectEntity> {
    return this.projectService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Post()
  create(@Body() project: ProjectEntity): Promise<ProjectEntity> {
    return this.projectService.create(project);
  }

  @Put()
  update(@Body() project: ProjectEntity) {
    return this.projectService.update(project);
  }

  @Delete(':id')
  delete(@Param('id')id: number) {
    return this.projectService.delete(id);
  }
}
