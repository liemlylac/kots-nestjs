import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { SessionEntity } from '../entities';

@EntityRepository(SessionEntity)
export class SessionRepository extends Repository<SessionEntity> {
  getByUserId(userId: string): Promise<SessionEntity[]> {
    return this.find({ userId });
  }

  getByUserIdAndDeviceId(
    userId: string,
    deviceId: string,
  ): Promise<SessionEntity> {
    return this.findOne({ userId, deviceId: deviceId });
  }

  deleteByUserIdAndDeviceId(
    userId: string,
    deviceId: string,
  ): Promise<DeleteResult> {
    return this.delete({ userId, deviceId: deviceId });
  }
}
