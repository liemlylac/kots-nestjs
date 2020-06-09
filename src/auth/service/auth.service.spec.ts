import { TestingModule, Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { UserService } from '../../user/service/user.service';
import { JwtConfigService } from './jwt.config.service';
import { ConfigModule } from '../../config/config.module';
import { UserRepository } from '../../user/entity/repo/user.repository';
import { User } from '../../user/entity/user.entity';
import { Login } from '../dto/login.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let hashService: HashService;
  let userRepository: UserRepository;

  const testDateData = new Date();

  const login: Login = {
    username: 'johndoe',
    password: 'hard!secret-password',
  };

  const users: User[] = [
    {
      id: 'uuid01',
      displayName: 'John Doe',
      username: 'johndoe',
      password: '',
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
      password: '',
      email: '',
      phone: '',
      active: false,
      createDate: testDateData,
      updateDate: testDateData,
    },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({ useClass: JwtConfigService }),
      ],
      providers: [HashService, AuthService, UserService, UserRepository],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    hashService = module.get<HashService>(HashService);
    userRepository = module.get<UserRepository>(UserRepository);
    jest
      .spyOn(userRepository, 'findOne')
      .mockImplementation(async condition => {
        return users.find(
          user =>
            user.username === condition.username &&
            user.active === condition.active,
        );
      });
    users[0].password = await hashService.hashPassword(login.password);
    users[1].password = await hashService.hashPassword(login.password);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateLogin', () => {
    it('should return User if match username and password', async () => {
      expect(
        await authService.validateLogin(login.username, login.password),
      ).toEqual(users[0]);
    });
  });
});
