import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  /**
   * Get active user by username
   *
   * @param username
   */
  getByUsername(username) {
    return this.findOne({ where: { username, active: true } });
  }
}
