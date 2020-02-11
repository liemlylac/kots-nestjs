import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepo.find();
  }

  async findByCreator(creatorId: number): Promise<Project[]> {
    return await this.projectRepo.find({
      where: {
        creatorId,
      },
    });
  }

  async findOne(id: number): Promise<Project> {
    return await this.projectRepo.findOne(id);
  }

  async create(project: Project): Promise<Project> {
    return await this.projectRepo.save(project);
  }

  async update(project: Project): Promise<UpdateResult> {
    return await this.projectRepo.update(project.id, project);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.projectRepo.delete(id);
  }
}
