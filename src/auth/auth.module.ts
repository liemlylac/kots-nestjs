import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as DeviceDetector from 'device-detector-js';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtConfig, JwtStrategy, LocalStrategy } from './passports';
import { authConfig } from './auth.config';
import {
  ActionRepository,
  PermissionRepository,
  ResourceRepository,
  RoleRepository,
  SessionRepository,
} from './resources/';
import { AuthService, RoleService, SessionService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActionRepository,
      PermissionRepository,
      ResourceRepository,
      RoleRepository,
      SessionRepository,
    ]),
    ConfigModule.forFeature(authConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfig }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RoleService,
    SessionService,
    DeviceDetector,
  ],
  exports: [AuthService, SessionService],
})
export class AuthModule {}
