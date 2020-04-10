import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './dto/user.create.dto';
import { UserEntityRepository } from './user.entity.repository';

@Injectable()
export class UserService {

  private readonly saltRounds = 10;

  constructor(
    private readonly userEntityRepository: UserEntityRepository,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userEntityRepository.find();
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userEntityRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userEntityRepository.findOne(id);
  }

  async create(userCreateDto: UserCreateDto): Promise<UserEntity> {
    userCreateDto.password = await this.getHash(userCreateDto.password);
    return await this.userEntityRepository.save(userCreateDto);
  }

  async getHash(password: string|undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async update(user: UserEntity): Promise<UpdateResult> {
    return await this.userEntityRepository.update(user.uuid, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userEntityRepository.delete(id);
  }
}
