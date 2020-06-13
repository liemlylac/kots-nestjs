import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../auth.service';
import { User } from '../../../user/entity/user.entity';

describe('class JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: () => {
              return null;
            },
          },
        },
        {
          provide: ConfigService,
          useValue: { get: key => key }, //mock config get return secret or key
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate()', () => {
    it('should return user schema when validate login return user schema', async () => {
      const user = new User();
      jest
        .spyOn(authService, 'validateUser')
        .mockImplementationOnce(async () => {
          return user;
        });
      expect(await jwtStrategy.validate({})).toEqual(user);
    });

    it('should throw unauthorized exception if validate login return null', async () => {
      jest.spyOn(authService, 'validateUser').mockImplementationOnce(() => {
        return null;
      });
      expect(jwtStrategy.validate({})).rejects.toThrow(UnauthorizedException);
    });
  });
});
