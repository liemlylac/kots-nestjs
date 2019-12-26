import { Test, TestingModule } from '@nestjs/testing';
import { IssueService } from '../issue.service';
import { IssueEntityRepository } from '../issue.entity.repository';

describe('TaskService', () => {
  let service: IssueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueService, IssueEntityRepository],
    }).compile();

    service = module.get<IssueService>(IssueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
