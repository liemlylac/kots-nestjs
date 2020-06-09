import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controler/user.controller';
import { UserRepository } from './entity/repo/user.repository';
import { UserSettingRepository } from './entity/repo/user-setting.repository';
import { UserService } from './service/user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserSettingRepository]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
