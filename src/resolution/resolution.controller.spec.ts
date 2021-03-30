import { Test, TestingModule } from '@nestjs/testing';
import { ResolutionController } from './resolution.controller';

describe('ResolutionController', () => {
  let controller: ResolutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResolutionController],
    }).compile();

    controller = module.get<ResolutionController>(ResolutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
