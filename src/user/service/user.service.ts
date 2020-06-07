import { Injectable } from '@nestjs/common';

import { User } from '../entity/user.entity';
import { UserRepository } from '../entity/repo/user.repository';
import { Register } from '../../auth/dto/register.dto';
import { HashService } from '../../auth/service/hash.service';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async getByUsername(username: string): Promise<User> {
    return await this.userRepo.getByUsername(username);
  }

  async create(user: Register): Promise<User> {
    user.password = await this.hashService.hashPassword(user.password);
    return await this.userRepo.save(user);
  }

  async update(id, user: Partial<User>) {
    await this.userRepo.update(id, user);
  }
}
