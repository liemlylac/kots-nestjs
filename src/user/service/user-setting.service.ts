import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserSettingRepository } from '../entity/repo/user-setting.repository';
import { USER_SETTING_DEFAULT } from '../default-user-setting.const';

@Injectable()
export class UserSettingService {

  constructor(
    private readonly userSettingRepo: UserSettingRepository,
  ) {
  }

  protected getDefaultSettingValue(keys: string|string[]): string|any {
    if (!Array.isArray(keys)) {
      return USER_SETTING_DEFAULT[keys] ?? null;
    }
    const settings: any = {};
    for(const key of keys) {
      settings.key = this.getDefaultSettingValue(key);
    }
    return settings;
  }

  async getSetting(user: User, keys: string | string[]): Promise<string> {
    const userSetting = await this.userSettingRepo.getSetting(user.id, keys);
    if (!userSetting) {
      return this.getDefaultSettingValue(keys);
    }
    return userSetting.value;
  }
}
