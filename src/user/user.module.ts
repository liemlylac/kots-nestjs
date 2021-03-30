import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserSettingRepository, UserRepository } from './resources';
import { UserService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserSettingRepository]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
