import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntityRepository } from '../../user/user.entity.repository';
import { JWT_MODULE_OPTIONS } from '@nestjs/jwt/dist/jwt.constants';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        UserEntityRepository,
        JwtService,
        {
          provide: JWT_MODULE_OPTIONS,
          useValue: JWT_MODULE_OPTIONS,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
