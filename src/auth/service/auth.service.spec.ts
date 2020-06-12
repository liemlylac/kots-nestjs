import { ConflictException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Register } from '../dto/register.dto';
import { Login } from '../dto/login.dto';
import { LoginRO } from '../ro/login.ro';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { JwtConfigService } from './jwt.config.service';
import { ConfigModule } from '../../config/config.module';
import { UserService } from '../../user/service/user.service';
import { UserRepository } from '../../user/entity/repo/user.repository';
import { User } from '../../user/entity/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let hashService: HashService;
  let jwtService: JwtService;

  const signJwt = 'signJwtGeneratedDummyValue';
  const testDateData = new Date();

  const users: User[] = [
    {
      id: 'uuid01',
      displayName: 'John Doe',
      username: 'johndoe',
      password: 'hard!secret-passwordHashed',
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
      password: 'hard!secret-passwordHashed',
      email: '',
      phone: '',
      active: false,
      createDate: testDateData,
      updateDate: testDateData,
    },
  ];

  const login: Login = {
    username: users[0].username,
    password: 'hard!secret-password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({ useClass: JwtConfigService }),
      ],
      providers: [
        HashService,
        AuthService,
        UserService,
        // no need to create user repository object from class UserRepository
        { provide: UserRepository, useValue: {} },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    hashService = module.get<HashService>(HashService);
    jwtService = module.get<JwtService>(JwtService);

    // Mock implementation
    jest
      .spyOn(userService, 'getByUsername')
      .mockImplementation(async username => {
        return users.find(
          user => user.username === username && user.active === true,
        );
      });

    jest
      .spyOn(hashService, 'hashPassword')
      .mockImplementation(async password => {
        return Promise.resolve(password + 'Hashed');
      });

    jest
      .spyOn(hashService, 'compareHash')
      .mockImplementation(async (password, hashed) => {
        return Promise.resolve(password + 'Hashed' === hashed);
      });

    jest.spyOn(jwtService, 'sign').mockImplementation(() => {
      return signJwt;
    });
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateLogin()', () => {
    it('should return User if match username and password', async () => {
      expect(
        await authService.validateLogin(login.username, login.password),
      ).toEqual(users[0]);
    });

    it('should return null if user is inactive', async () => {
      expect(
        await authService.validateLogin('john_doe', login.password),
      ).toBeNull();
    });

    it('should return null if incorrect username', async () => {
      expect(
        await authService.validateLogin('wrong_username', login.password),
      ).toBeNull();
    });

    it('should return null if incorrect password', async () => {
      expect(
        await authService.validateLogin(login.username, 'wrong_password'),
      ).toBeNull();
    });
  });

  const loginRegex: LoginRO = {
    displayName: expect.stringMatching(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/),
    username: expect.stringMatching(
      /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    ),
    token: signJwt,
  };

  describe('afterLogin()', () => {
    it('should return object include token', async () => {
      expect(await authService.afterLogin(users[0])).toMatchObject(loginRegex);
    });
  });

  describe('register()', () => {
    it('should return login response object when register success', async () => {
      jest
        .spyOn(userService, 'create')
        .mockImplementationOnce(async register => {
          const user = new User();
          user.displayName = register.displayName;
          user.username = register.username;
          return user;
        });

      const registerData: Register = {
        displayName: users[0].displayName,
        username: users[0].username + 'other',
        password: login.password,
      };
      expect(await authService.register(registerData)).toMatchObject(
        loginRegex,
      );
    });

    it('should throw exception when username is already exists', async () => {
      const registerData: Register = {
        displayName: users[0].displayName,
        username: users[0].username,
        password: users[0].password,
      };
      expect(authService.register(registerData)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
