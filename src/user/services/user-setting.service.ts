import { Injectable } from '@nestjs/common';
import { USER_SETTING_DEFAULT } from '../user.constant';
import { UserEntity } from '../entities';
import { UserSettingRepository } from '../resources';

@Injectable()
export class UserSettingService {
  constructor(private readonly userSettingResource: UserSettingRepository) {}

  async getSetting(user: UserEntity, keys: string | string[]): Promise<string> {
    const userSetting = await this.userSettingResource.getSetting(
      user.id,
      keys,
    );
    if (!userSetting) {
      return this.getDefaultSettingValue(keys);
    }
    return userSetting.value;
  }

  protected getDefaultSettingValue(keys: string | string[]): string | any {
    if (!Array.isArray(keys)) {
      return USER_SETTING_DEFAULT[keys] ?? null;
    }
    const settings: any = {};
    for (const key of keys) {
      settings.key = this.getDefaultSettingValue(key);
    }
    return settings;
  }
}
