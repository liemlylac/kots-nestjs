import { TestingModule, Test } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { UserService } from '../../user/service/user.service';
import { JwtConfigService } from './jwt.config.service';
import { ConfigModule } from '../../config/config.module';
import { UserRepository } from '../../user/entity/repo/user.repository';

describe('class AuthService', () => {

  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({ useClass: JwtConfigService })
      ],
      providers: [
        HashService,
        AuthService,
        UserService,
        UserRepository
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  })
});
