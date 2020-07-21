import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { RoleController } from './controller/role.controller';
import { ResourceController } from './controller/resource.controller';
import { JwtStrategy } from './service/passport/jwt.strategy';
import { LocalStrategy } from './service/passport/local.strategy';
import { GoogleStrategy } from './service/passport/google.strategy';
import { AuthService } from './service/auth.service';
import { HashService } from './service/hash.service';
import { CryptoService } from './service/crypto.service';
import { JwtConfigService } from './service/jwt.config.service';
import { RoleService } from './service/role.service';
import { ResourceService } from './service/resource.service';
import { Role } from './entity/role.entity';
import { Resource } from './entity/resource.entity';
import { Action } from './entity/action.entity';
import { Permission } from './entity/permission.entity';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Resource, Action, Permission]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    UserModule,
  ],
  providers: [
    AuthService,
    HashService,
    CryptoService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    RoleService,
    ResourceService,
  ],
  controllers: [AuthController, RoleController, ResourceController],
  exports: [AuthService, HashService],
})
export class AuthModule {}
