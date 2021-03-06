import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Get active user by username
   *
   * @param username
   */
  getByUsername(username) {
    return this.findOne({ username, active: true });
  }
}
