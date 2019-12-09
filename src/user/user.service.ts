import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepo.findOne({
      where: {
        username,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepo.findOne(id);
  }

  async create(user: User): Promise<User> {
    user.password = await this.getHash(user.password);
    return await this.userRepo.save(user);
  }

  async getHash(password: string|undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.userRepo.update(user.id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
