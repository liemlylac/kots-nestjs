import { TestingModule, Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User } from '../user.entity';

describe('class UserRepository', () => {
  let userRepository: UserRepository;
  const testDateData = new Date();
  const users: User[] = [
    {
      id: 'uuid01',
      fullName: 'John Doe',
      picture: 'johndoe',
      password: 'secretPassword',
      email: 'johndoe@example.com',
      phone: '',
      active: true,
      createDate: testDateData,
      updateDate: testDateData,
    },
    {
      id: 'uuid02',
      fullName: 'John Doe',
      picture: 'john_doe',
      password: 'secretPassword',
      email: 'john_doe@example.com',
      phone: '',
      active: false,
      createDate: testDateData,
      updateDate: testDateData,
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getByUsername()', () => {
    beforeAll(async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async condition => {
          return users.find(
            user =>
              user.email === condition.email &&
              user.active === condition.active,
          );
        });
    });

    it('should return user with email and is active', async () => {
      expect(await userRepository.getByEmail('johndoe@example.com')).toEqual(
        users[0],
      );
    });

    it('should not return with email and is inactive', async () => {
      expect(
        await userRepository.getByEmail('john_doe@example.com'),
      ).not.toEqual(users[1]);
    });

    it('should not return user is not exist', async () => {
      expect(await userRepository.getByEmail('no_email')).toBeUndefined();
    });
  });
});
