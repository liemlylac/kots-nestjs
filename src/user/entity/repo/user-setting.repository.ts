import { EntityRepository, Repository, In } from 'typeorm';
import { UserSettingEntity } from '../user-setting.entity';

@EntityRepository(UserSettingEntity)
export class UserSettingRepository extends Repository<UserSettingEntity> {
  /**
   * Getting user setting by key
   *
   * @param userId string
   * @param keys string
   */
  getSetting(
    userId: string,
    keys?: string | string[],
  ): Promise<UserSettingEntity> {
    const options: any = { userId };
    if (keys) {
      if (Array.isArray(keys) && keys.length > 0) {
        options.key = In(keys);
      } else {
        options.key = keys;
      }
    }
    return this.findOne({ where: options });
  }

  saveSetting(userId: string, key: string, value: string) {
    const userSettingEntity = new UserSettingEntity({ userId, key, value });
    return this.save(userSettingEntity);
  }
}
