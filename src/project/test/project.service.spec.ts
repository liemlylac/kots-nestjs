import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../project.service';
import { ProjectEntityRepository } from '../project.entity.repository';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, ProjectEntityRepository],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
