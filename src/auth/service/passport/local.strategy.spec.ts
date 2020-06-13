import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../auth.service';
import { User } from '../../../user/entity/user.entity';

describe('class LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateLogin: async () => {
              return null;
            },
          },
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe('validate()', () => {
    it('should return user schema when validate login return user schema', async () => {
      const user = new User();
      jest
        .spyOn(authService, 'validateLogin')
        .mockImplementationOnce(async () => {
          return user;
        });
      expect(await localStrategy.validate('anything', 'anything')).toEqual(
        user,
      );
    });

    it('should throw unauthorized exception if validate login return null', async () => {
      expect(localStrategy.validate('anything', 'anything')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});