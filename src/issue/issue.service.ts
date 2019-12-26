import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IssueEntity } from './issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(IssueEntity)
    private readonly issueRepo: Repository<IssueEntity>,
  ) {}

  async findAll(): Promise<IssueEntity[]> {
    return await this.issueRepo.find();
  }

  async findByProject(projectId: number): Promise<IssueEntity[]> {
    return await this.issueRepo.find({
      where: {
        projectId,
      },
    });
  }

  async findByCreator(userId: number): Promise<IssueEntity[]> {
    return await this.issueRepo.find({
      where: {
        userId,
      },
    });
  }

  async findOne(id: number): Promise<IssueEntity> {
    return await this.issueRepo.findOne(id);
  }

  async create(task: IssueEntity): Promise<IssueEntity> {
    return await this.issueRepo.save(task);
  }

  async update(task: IssueEntity): Promise<UpdateResult> {
    return await this.issueRepo.update(task.id, task);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.issueRepo.delete(id);
  }
}
