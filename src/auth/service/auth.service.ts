import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Register } from '../dto/register.dto';
import { LoginRO } from '../ro/login.ro';
import { HashService } from './hash.service';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly usersService: UserService,
  ) {}

  /**
   * Use for LocalStrategy
   *
   * @param username
   * @param password
   */
  async validateLogin(username, password) {
    const user = await this.validateUser(username);
    if (user && (await this.hashService.compareHash(password, user.password))) {
      return user;
    }
    return null;
  }

  /**
   * Use for JwtStrategy
   *
   * @param username
   */
  async validateUser(username) {
    const user = await this.usersService.getByUsername(username);
    if (user && user.active) {
      return user;
    }
    return null;
  }

  /**
   * Use to return user data and token after login successfully
   *
   * @param user
   */
  async afterLogin(user: User): Promise<LoginRO> {
    const payload = { userId: user.id, username: user.username };
    return {
      displayName: user.displayName,
      username: user.username,
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Register a new user
   *
   * @param register
   */
  async register(register: Register): Promise<LoginRO> {
    const existingUser = await this.usersService.getByUsername(
      register.username,
    );
    if (existingUser && existingUser.id) {
      throw new ConflictException('User with this username is already exists');
    }
    // If username is available, create a new user and login
    const newUser = await this.usersService.create(register);
    return this.afterLogin(newUser);
  }
}
