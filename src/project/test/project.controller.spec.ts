import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from '../project.controller';
import { ProjectService } from '../project.service';
import { ProjectEntityRepository } from '../project.entity.repository';

describe('Project Controller', () => {
  let projectController: ProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [ProjectService, ProjectEntityRepository],
    }).compile();

    projectController = module.get<ProjectController>(ProjectController);
  });

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  });
});
