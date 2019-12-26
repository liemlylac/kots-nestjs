import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  async findAll(): Promise<ProjectEntity[]> {
    return await this.projectRepo.find();
  }

  async findByCreator(creatorId: number): Promise<ProjectEntity[]> {
    return await this.projectRepo.find({
      where: {
        creatorId,
      },
    });
  }

  async findOne(id: number): Promise<ProjectEntity> {
    return await this.projectRepo.findOne(id);
  }

  async create(project: ProjectEntity): Promise<ProjectEntity> {
    return await this.projectRepo.save(project);
  }

  async update(project: ProjectEntity): Promise<UpdateResult> {
    return await this.projectRepo.update(project.id, project);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.projectRepo.delete(id);
  }
}
