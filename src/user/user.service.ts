import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Register } from '../auth/dto/register.dto';
import { CryptService } from '../auth/crypt.service';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepo: UserRepository,
    private readonly cryptService: CryptService,
  ) {}

  async getByUsername(username: string): Promise<User> {
    return await this.userRepo.getByUsername(username);
  }

  async create(user: Register): Promise<User> {
    user.password = await this.cryptService.hashPassword(user.password);
    return await this.userRepo.save(user);
  }

  async update(id, user: Partial<User>) {
    await this.userRepo.update(id, user);
  }
}
