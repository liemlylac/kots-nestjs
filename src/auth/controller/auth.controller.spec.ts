import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { ConfigModule } from '../../config/config.module';
import { JwtConfigService } from '../service/jwt.config.service';
import { HashService } from '../service/hash.service';
import { UserService } from '../../user/service/user.service';
import { UserRepository } from '../../user/entity/repo/user.repository';

describe('Auth Controller', () => {
  let authController: AuthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({ useClass: JwtConfigService }),
      ],
      controllers: [AuthController],
      providers: [HashService, AuthService, UserService, UserRepository],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
