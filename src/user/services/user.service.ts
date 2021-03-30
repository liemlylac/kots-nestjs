import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthService, RegisterDTO } from '../../auth';
import { EditUserDTO } from '../dto/';
import { UserEntity } from '../entities';
import { UserRepository } from '../resources';
import { UserProfileRO, UserProfileType } from '../ro';

@Injectable()
export class UserService {
  private readonly logger = new Logger();

  constructor(
    private readonly userRepo: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async getByIdOrFailed(id: string): Promise<UserEntity> {
    const user = await this.userRepo.getById(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async mapProfile(user: UserEntity, group: UserProfileType) {
    return plainToClass(UserProfileRO, user, {
      excludeExtraneousValues: true,
      groups: [group],
    });
  }

  async getDetail(id: string): Promise<UserProfileRO> {
    const user: UserEntity = await this.getByIdOrFailed(id);
    return this.mapProfile(user, UserProfileType.Detail);
  }

  getByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.getByEmail(email);
  }

  async validateEmailTaken(email: string) {
    if (await this.userRepo.isEmailExist(email)) {
      throw new ConflictException({
        code: 'EMAIL_IS_ALREADY_IN_USE',
        message:
          'That email address is already in use, please use a different email address',
      });
    }
  }

  /**
   * This expose service for register by AuthModule
   */
  async register(data: RegisterDTO): Promise<UserEntity> {
    await this.validateEmailTaken(data.email);
    const user = this.userRepo.create({ ...data, country: 'VN' });
    user.password = await this.authService.hashPassword(data.password);
    try {
      return await this.userRepo.save(user, { reload: true });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  /**
   * This expose service for create user controller
   */
  async create(data: RegisterDTO): Promise<UserProfileRO> {
    const user = await this.register(data);
    return this.mapProfile(user, UserProfileType.Detail);
  }

  async update(id: string, editUserDTO: EditUserDTO) {
    const user = await this.getByIdOrFailed(id);
    try {
      const updateUser = this.userRepo.merge(user, editUserDTO);
      await this.userRepo.save(updateUser);
      return this.mapProfile(updateUser, UserProfileType.Detail);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  async resetPassword(email: string, password: string) {
    const account = await this.getByEmail(email);
    account.password = await this.authService.hashPassword(password);
    try {
      await this.userRepo.update(account.id, account);
      return account;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
