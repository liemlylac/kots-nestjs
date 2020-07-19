import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { HashService } from '../service/hash.service';
import { UserService } from '../../user/service/user.service';
import { LoginResult } from '../ro/login.ro';
import { Register } from '../dto/register.dto';

describe('Auth Controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: HashService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return login object', async () => {
      const loginRO = new LoginResult();

      jest.spyOn(authService, 'afterLogin').mockImplementation(
        async (): Promise<LoginResult> => {
          return loginRO;
        },
      );
      expect(
        await authController.login(
          {
            username: '',
            password: '',
          },
          {},
        ),
      ).toMatchObject(loginRO);
    });
  });

  describe('register', () => {
    it('should return login object after register success', async () => {
      const loginRO = new LoginResult();

      jest.spyOn(authService, 'register').mockImplementation(
        async (): Promise<LoginResult> => {
          return loginRO;
        },
      );

      expect(await authController.register(new Register())).toMatchObject(
        loginRO,
      );
    });

    it('should throw ConflictException when AuthService throw exception', async () => {
      jest.spyOn(authService, 'register').mockImplementation(
        async (): Promise<LoginResult> => {
          throw new ConflictException();
        },
      );

      expect(authController.register(new Register())).rejects.toThrowError(
        ConflictException,
      );
    });
  });
});
