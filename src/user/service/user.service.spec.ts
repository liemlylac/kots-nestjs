import { TestingModule, Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { HashService } from '../../auth/service/hash.service';
import { UserRepository } from '../entity/repo/user.repository';

describe('class UserService', () => {

  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        HashService,
        UserService,
        UserRepository
      ]
    }).compile();

    userService = module.get<UserService>(UserService);

  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  })
});
