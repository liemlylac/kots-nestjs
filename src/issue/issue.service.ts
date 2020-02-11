import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Issue } from './issue.entity';
import { IssueRepository } from './issue.repository';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepo: IssueRepository,
  ) {}

  async findById(id: number): Promise<Issue> {
    return await this.issueRepo.findOne(id);
  }

  async create(task: Issue): Promise<Issue> {
    return await this.issueRepo.save(task);
  }

  async update(task: Issue): Promise<UpdateResult> {
    return await this.issueRepo.update(task.id, task);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.issueRepo.delete(id);
  }
}
