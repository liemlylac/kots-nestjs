import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Register } from '../dto/register.dto';
import { LoginResult } from '../ro/login.ro';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/entity/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let hashService: HashService;
  let jwtService: JwtService;

  const signJwt = 'signJwtGeneratedDummyValue';
  const testDateData = new Date();

  const user: User = {
    id: 'uuid01',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    password: 'hard!secret-passwordHashed',
    picture: null,
    phone: null,
    active: true,
    createDate: testDateData,
    updateDate: testDateData,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        // mock provider
        { provide: JwtService, useValue: { sign: () => null } },
        { provide: HashService, useValue: { compareHash: () => null } },
        {
          provide: UserService,
          useValue: { getByEmail: () => null, create: () => null },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    hashService = module.get<HashService>(HashService);
    jwtService = module.get<JwtService>(JwtService);

    // Mock implementation
    jest.spyOn(jwtService, 'sign').mockImplementation(() => {
      return signJwt;
    });
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateLogin()', () => {
    it('should return User if match email and password', async () => {
      const user = new User({ active: true });
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => {
        return user;
      });
      jest.spyOn(hashService, 'compareHash').mockImplementation(async () => {
        return true;
      });
      expect(await authService.validateLogin('anything', 'anything')).toEqual(
        user,
      );
    });

    it('should return null if wrong password', async () => {
      const user = new User({ active: true });
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => {
        return user;
      });
      jest.spyOn(hashService, 'compareHash').mockImplementation(async () => {
        return false;
      });
      expect(
        await authService.validateLogin('anything', 'anything'),
      ).toBeNull();
    });

    it('should return null if user is not existed', async () => {
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => {
        return null;
      });
      expect(
        await authService.validateLogin('anything', 'anything'),
      ).toBeNull();
    });
  });

  describe('validateUser()', () => {
    it('should return User if match email', async () => {
      const user = new User({ active: true });
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => {
        return user;
      });
      expect(await authService.validateUser('anything')).toEqual(user);
    });

    it('should return null if email is not existed', async () => {
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => {
        return null;
      });
      expect(await authService.validateUser('anything')).toBeNull();
    });
  });

  const loginRegex: LoginResult = {
    isSuccess: true,
    loginUser: {
      fullName: expect.stringMatching(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/),
      email: expect.stringMatching(
        /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      ),
      picture: '',
      accessToken: signJwt,
    },
  };

  describe('afterLogin()', () => {
    it('should return object include token', async () => {
      expect(await authService.afterLogin(user)).toMatchObject(loginRegex);
    });
  });

  describe('register()', () => {
    const registerData: Register = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
    };

    it('should return login response object when register success', async () => {
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => {
        return null;
      });
      jest
        .spyOn(userService, 'create')
        .mockImplementationOnce(async register => {
          const user = new User();
          user.fullName = register.fullName;
          user.email = register.email;
          return user;
        });

      expect(await authService.register(registerData)).toMatchObject(
        loginRegex,
      );
    });

    it('should throw exception when email is already exists', async () => {
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => {
        return new User();
      });
      expect(authService.register(registerData)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw exception when internal server error', async () => {
      jest.spyOn(userService, 'getByEmail').mockImplementation(async () => {
        return null;
      });
      jest.spyOn(userService, 'create').mockImplementationOnce(async () => {
        throw new InternalServerErrorException();
      });
      expect(authService.register(registerData)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
