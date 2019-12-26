import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { UserService } from '../user.service';
import { UserEntity } from '../user.entity';
import { UserMockRepository } from './user.mock.repository';
import { UserController } from '../user.controller';

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: UserMockRepository,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
    app = module.createNestApplication();
    await app.init();
  });

  it ('/user (GET)', async () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect( await userService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
