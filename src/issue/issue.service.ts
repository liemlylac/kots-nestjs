import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Issue } from './issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepo: Repository<Issue>,
  ) {}

  async findAll(): Promise<Issue[]> {
    return await this.issueRepo.find();
  }

  async findByProject(projectId: number): Promise<Issue[]> {
    return await this.issueRepo.find({
      where: {
        projectId,
      },
    });
  }

  async findByCreator(userId: number): Promise<Issue[]> {
    return await this.issueRepo.find({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number): Promise<Issue> {
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
