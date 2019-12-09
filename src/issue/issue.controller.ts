import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IssueService } from './issue.service';
import { Issue } from './issue.entity';

@Controller('issues')
export class IssueController {
  constructor(private readonly taskService: IssueService) {
  }

  @Get()
  findAll(): Promise<Issue[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Issue> {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() task: Issue): Promise<Issue> {
    return this.taskService.create(task);
  }

  @Put()
  update(@Body() task: Issue) {
    return this.taskService.update(task);
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
