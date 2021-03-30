import { Test, TestingModule } from '@nestjs/testing';
import { ResolutionService } from './resolution.service';
import { ResolutionResource } from '../resources';

jest.mock('../resources');
describe('ResolutionService', () => {
  let service: ResolutionService;
  let resource: ResolutionResource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResolutionService, ResolutionResource],
    }).compile();

    service = module.get<ResolutionService>(ResolutionService);
    resource = module.get<ResolutionResource>(ResolutionResource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(resource).toBeDefined();
  });
});
