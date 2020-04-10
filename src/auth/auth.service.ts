import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(
      private readonly usersService: UserService,
      private readonly jwtService: JwtService,
    ) {
    }

    /**
     * Use for LocalStrategy
     *
     * @param username
     * @param password
     */
    async validateLogin(username, password) {
        const user = await this.usersService.getByUsername(username);
        if (user && await this.usersService.compareHash(password, user.password)) {
            return user
        }
        return null;
    }

    /**
     * Use to return user data and token after login successfully
     *
     * @param user
     */
    async login(user: UserEntity): Promise<any> {
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
    async register(register: RegisterDto): Promise<any> {
        const existingUser = await this.usersService.getByUsername(register.username);
        if (existingUser && existingUser.id) {
            throw new ConflictException('User with this username is already exists');
        }
        // If username is available, create a new user and login
        const newUser =  await this.usersService.create(register);
        return this.login(newUser);
    }
}
