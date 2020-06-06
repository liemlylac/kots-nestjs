import { TestingModule, Test } from '@nestjs/testing';
import { TokenService } from './token.service';

describe('class TokenService', () => {

  let tokenService: TokenService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService]
    }).compile();

    tokenService = module.get<TokenService>(TokenService);

  });

  it('should be defined', () => {
    expect(tokenService).toBeDefined();
  })
});
