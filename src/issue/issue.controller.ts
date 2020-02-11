import {
  Body, Controller, Delete, Get, Param, Post, Put, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IssueService } from './issue.service';
import { Issue } from './issue.entity';

@ApiTags('Issues')
@Controller('issues')
@UseGuards(AuthGuard())
export class IssueController {
  constructor(
    private readonly issueService: IssueService,
  ) {
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Issue> {
    return this.issueService.findById(id);
  }

  @Post()
  create(@Body() task: Issue): Promise<Issue> {
    return this.issueService.create(task);
  }

  @Put(':id')
  update(@Body() task: Issue) {
    return this.issueService.update(task);
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.issueService.delete(id);
  }
}
