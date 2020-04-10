import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {

  private readonly saltRounds = 10;

  constructor(
    private readonly userRepo: UserRepository,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async getByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.getByUsername(username);
  }

  async create(user: RegisterDto): Promise<UserEntity> {
    user.password = await this.hashPassword(user.password);
    return await this.userRepo.save(user);
  }

  async update(id, user: Partial<UserEntity>) {
    await this.userRepo.update(id, user);
  }
}
