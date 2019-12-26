import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { UserMockRepository } from './user.mock.repository';

describe('UserService', () => {
  let userService: UserService;
  let userMockRepository: UserMockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: UserMockRepository,
        },
      ],
    }).compile();

    userMockRepository = module.get<UserMockRepository>(getRepositoryToken(UserEntity));
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return a list of users', () => {
    expect(userService.findAll()).resolves.toEqual(userMockRepository.find());
  });

  it('should return a user with specified id', () => {
    expect(userService.findOne(1)).resolves.toEqual(userMockRepository.findOne(1));
  });
});
