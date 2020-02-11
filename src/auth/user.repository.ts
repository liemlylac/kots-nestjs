import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as config from 'config';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

const pepperConfig = config.get('pepper');

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  /**
   * Find one UserEntity by 'username'
   * @param username
   * @return Promise<User>
   */
  async findByUsername(username: string): Promise<User> {
    return await this.findOne({ username });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(10);
    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && await this.validatePassword(password, user)) {
      return user.username;
    } else {
      return null;
    }

  }

  protected async validatePassword(password: string, user: User): Promise<boolean> {
    const salt = await bcrypt.getSalt(user.password);
    return user.password === await this.hashPassword(password, salt);
  }

  protected async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt + pepperConfig.secret);
  }
}
