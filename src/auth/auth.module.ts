import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { HashService } from './service/hash.service';
import { JwtConfigService } from './service/jwt.config.service';
import { TokenService } from './service/token.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    UserModule,
  ],
  providers: [
    AuthService,
    HashService,
    TokenService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, HashService],
})
export class AuthModule {}
