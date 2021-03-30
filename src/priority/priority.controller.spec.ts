import { Test, TestingModule } from '@nestjs/testing';
import { PriorityController } from './priority.controller';
import { PriorityService } from './priority.service';
import { PriorityResource } from './priority.resource';

jest.mock('./priority.service');
jest.mock('./priority.resource');
describe('PriorityController', () => {
  let controller: PriorityController;
  let service: PriorityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriorityController],
      providers: [PriorityService, PriorityResource],
    }).compile();

    controller = module.get<PriorityController>(PriorityController);
    service = module.get<PriorityService>(PriorityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
