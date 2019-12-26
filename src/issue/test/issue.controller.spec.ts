import { Test, TestingModule } from '@nestjs/testing';
import { IssueController } from '../issue.controller';
import { IssueService } from '../issue.service';
import { IssueEntityRepository } from '../issue.entity.repository';

describe('Task Controller', () => {
  let controller: IssueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueController],
      providers: [IssueService, IssueEntityRepository],
    }).compile();

    controller = module.get<IssueController>(IssueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
