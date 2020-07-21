import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Get active user by email
   *
   * @param email
   */
  getByEmail(email) {
    return this.findOne({ email });
  }
}
