import { Test, TestingModule } from '@nestjs/testing';
import { WikiController } from './wiki.controller';

describe('WikiController', () => {
  let controller: WikiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WikiController],
    }).compile();

    controller = module.get<WikiController>(WikiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
