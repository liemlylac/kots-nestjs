import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtConfigService } from './jwt.config.service';

describe('class JwtConfigService', () => {
  let jwtConfigService: JwtConfigService;
  let configService: ConfigService;

  const jwtOptions = {
    secret: 'kotsJwtSecretKey',
    signOptions: {
      expiresIn: 28800000,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtConfigService, ConfigService],
    }).compile();

    jwtConfigService = module.get<JwtConfigService>(JwtConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(jwtConfigService).toBeDefined();
  });

  describe('createJwtOptions()', () => {
    it('shout return jwt options', async () => {
      // mock method of object with parameter
      jest.spyOn(configService, 'get').mockImplementation(configKey => {
        if (configKey === 'auth.jwt.accessSecretKey') {
          return jwtOptions.secret;
        }
        if (configKey === 'auth.jwt.accessKeyLifetime') {
          return jwtOptions.signOptions.expiresIn;
        }
      });
      expect(jwtConfigService.createJwtOptions()).toStrictEqual(jwtOptions);
    });
  });
});
