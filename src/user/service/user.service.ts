import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../entity/repo/user.repository';
import { Register } from '../../auth/dto/register.dto';
import { HashService } from '../../auth/service/hash.service';
import { LoggerService } from '../../core/services/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hashService: HashService,
    private readonly logger: LoggerService,
  ) {
    this.logger.setContext(UserService.name);
  }

  /**
   * Get User by username
   *
   * @param username
   */
  async getByUsername(username: string): Promise<User> {
    return await this.userRepo.getByUsername(username);
  }

  /**
   * Create user account
   *
   * @param user
   *
   * @throws InternalServerErrorException
   */
  async create(user: Register): Promise<User> {
    user.password = await this.hashService.hashPassword(user.password);
    try {
      return await this.userRepo.save(user);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Update user info
   *
   * @param id
   * @param user
   */
  async update(id: string, user: Partial<User>) {
    try {
      await this.userRepo.update(id, user);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
