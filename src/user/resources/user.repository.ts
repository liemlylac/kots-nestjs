import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  getById(id: string) {
    return this.findOne({ id });
  }

  getByEmail(email, active = true) {
    return this.findOne({ email, active });
  }

  async isEmailExist(email): Promise<boolean> {
    return (await this.count({ where: { email } })) > 0;
  }
}
