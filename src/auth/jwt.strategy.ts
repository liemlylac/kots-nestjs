import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as config from 'config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';

const jwtConfig = config.get('jwt');

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;

    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
