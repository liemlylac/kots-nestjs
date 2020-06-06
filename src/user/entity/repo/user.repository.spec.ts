import { TestingModule, Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User } from '../user.entity';

describe('class UserRepository', () => {

  let userRepository: UserRepository;
  const testDateData = new Date();
  const users: User[] = [
    {
      id: 'uuid01',
      displayName: 'John Doe',
      username: 'johndoe',
      password: 'secretPassword',
      email: '',
      phone: '',
      active: true,
      createDate: testDateData,
      updateDate: testDateData,
    },
    {
      id: 'uuid02',
      displayName: 'John Doe',
      username: 'john_doe',
      password: 'secretPassword',
      email: '',
      phone: '',
      active: false,
      createDate: testDateData,
      updateDate: testDateData,
    },
  ]

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
      ]
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);

  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getByUsername()', () => {
    beforeAll(async () => {
      jest.spyOn(userRepository, 'findOne').mockImplementation(async (condition) => {
        return users.find(user =>
          user.username === condition.username && user.active === condition.active
        );
      });
    });

    it('should return user with username and is active', async () => {
      expect(await userRepository.getByUsername('johndoe')).toEqual(users[0]);
    });

    it('should not return with username and is inactive', async () => {
      expect(await userRepository.getByUsername('john_doe')).not.toEqual(users[1]);
    });

    it('should not return user is not exist', async () => {
      expect(await userRepository.getByUsername('no_username')).toBeUndefined();
    });
  });
})
