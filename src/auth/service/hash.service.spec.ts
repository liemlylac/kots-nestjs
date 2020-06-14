import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HashService } from './hash.service';

describe('class HashService', () => {
  let hashService: HashService;
  // noinspection SpellCheckingInspection
  const obj = {
    pepper: 'kotsSecretPepper',
    salt: '$2a$10$rAbkDL9ANLkgStTrHUbN9.',
    password: 'hard!secret-password',
    hashPassword:
      '$2a$10$rAbkDL9ANLkgStTrHUbN9.1/i65T6YC1xSTRklh8MpwVuR8FV02BW',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
        {
          provide: ConfigService,
          useValue: {
            get: key => (key === 'auth.pepper' ? obj.pepper : null),
          },
        },
      ],
    }).compile();

    hashService = module.get<HashService>(HashService);
  });

  it('should be defined', () => {
    expect(hashService).toBeDefined();
  });

  describe('getSalt()', () => {
    it('should return unique salt', async () => {
      const oldSalt = hashService.getSalt();
      expect(hashService.getSalt()).toEqual(
        expect.stringMatching(/^\$2[ayb]\$10\$.{22}$/),
      );
      expect(hashService.getSalt()).not.toEqual(oldSalt);
    });
  });

  describe('hashPassword()', () => {
    it('should return a hash password', async () => {
      jest.spyOn(hashService, 'getSalt').mockImplementationOnce(() => {
        return obj.salt;
      });
      expect(await hashService.hashPassword(obj.password)).toEqual(
        expect.stringMatching(/^\$2[ayb]\$10\$.{53}$/),
      );
    });

    it('should return a separate hash password for each user', async () => {
      expect(await hashService.hashPassword(obj.password)).not.toEqual(
        obj.hashPassword,
      );
    });
  });

  describe('compareHash()', () => {
    it('should return true if input right password', async () => {
      expect(
        await hashService.compareHash(obj.password, obj.hashPassword),
      ).toBe(true);
    });

    it('should return false if input wrong password', async () => {
      expect(
        await hashService.compareHash('someWrongPassword', obj.hashPassword),
      ).toBe(false);
    });
  });
});
