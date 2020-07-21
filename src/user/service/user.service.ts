import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { LoggerService } from '@core/services/logger-service';
import { User } from '../entity/user.entity';
import { UserRepository } from '../entity/repo/user.repository';
import { Register } from '../../auth/dto/register.dto';
import { HashService } from '../../auth/service/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    private readonly hashService: HashService,
    private readonly userRepo: UserRepository,
  ) {}

  /**
   * Get User by email
   *
   * @param email
   */
  async getByEmail(email: string): Promise<User> {
    return await this.userRepo.getByEmail(email);
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
      // We need to reload to get id of user to generate token
      return await this.userRepo.save(user, { reload: true });
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
    if (user.email) {
      const existUserWithEmail = await this.userRepo.getByEmail(user.email);
      if (existUserWithEmail) {
        throw new BadRequestException('Email Already in Use');
      }
    }

    try {
      await this.userRepo.update(id, user);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  /**
   *
   * @param id
   * @param password
   */
  async changePassword(id: any, password: string) {
    const user = await this.userRepo.findOne({ id });
    if (!user) {
      throw new NotFoundException('User is not existed');
    }
    user.password = await this.hashService.hashPassword(password);
    try {
      await this.userRepo.update(id, user);
      return user;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
