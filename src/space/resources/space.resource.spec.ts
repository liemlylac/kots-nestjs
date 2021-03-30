import { Test, TestingModule } from '@nestjs/testing';
import { SpaceResource } from './space.resource';

describe('SpaceResource', () => {
  let resource: SpaceResource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceResource],
    }).compile();

    resource = module.get<SpaceResource>(SpaceResource);
  });

  it('should be defined', () => {
    expect(resource).toBeDefined();
  });
});
