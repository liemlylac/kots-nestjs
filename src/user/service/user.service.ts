import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../entity/repo/user.repository';
import { Register } from '../../auth/dto/register.dto';
import { HashService } from '../../auth/service/hash.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class UserService {
  constructor(
    //@Inject(Logger)
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly hashService: HashService,
    private readonly userRepo: UserRepository,
  ) {}

  /**
   * Get User by username
   *
   * @param username
   */
  async getByUsername(username: string): Promise<User> {
    return await this.userRepo.getByUsername(username);
  }

  /**
   * Get User by username
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
    const user = new User();
    user.password = await this.hashService.hashPassword(password);
    try {
      return await this.userRepo.update(id, user);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
