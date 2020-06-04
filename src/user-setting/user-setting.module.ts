import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingService } from './user-setting.service';
import { UserSettingRepository } from './user-setting.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSettingRepository])],
  providers: [UserSettingService],
  exports: [UserSettingService]
})
export class UserSettingModule {
}
