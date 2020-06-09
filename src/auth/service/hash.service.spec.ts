import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HashService } from './hash.service';
import * as bcrypt from 'bcryptjs';

describe('class HashService', () => {
  let hashService: HashService;
  const configService: ConfigService = new ConfigService();
  const obj = {
    pepper: 'kotsSecretPepper',
    salt: 'kotsSecretSalt',
    saltRounds: 10,
    password: 'hard!secret-password',
    hashPassword: '',
  };

  beforeAll(async () => {
    // Here we mock ConfigService before inject to HashService constructor
    jest.spyOn(configService, 'get').mockImplementation(key => {
      if (key === 'auth.pepper') {
        return obj.pepper;
      }
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HashService,
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    hashService = module.get<HashService>(HashService);

    // Business logic when hashing password
    obj.hashPassword = await bcrypt.hash(
      obj.password + obj.pepper,
      obj.saltRounds,
    );
  });

  it('should be defined', () => {
    expect(hashService).toBeDefined();
  });

  describe('hashPassword()', () => {
    it('should return a hash password', async () => {
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

  describe('hashPassword()', () => {
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
