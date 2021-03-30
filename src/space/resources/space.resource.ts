import { EntityRepository, Repository } from 'typeorm';
import { SpaceEntity } from '../entities';
import { generateRandomString } from '@app/common';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(SpaceEntity)
export class SpaceResource extends Repository<SpaceEntity> {
  private entityName: string = SpaceEntity.name;

  getSpacesByOwner(userId: string) {
    return this.find({ ownerUserId: userId });
  }

  getSpace(key: string, active = true): Promise<SpaceEntity> {
    return this.findOne({ key, active });
  }

  async getSpaceOrFailed(key: string, active = true): Promise<SpaceEntity> {
    const space = await this.getSpace(key, active);

    if (!space) {
      throw new NotFoundException(`${this.entityName} was not found.`);
    }

    return space;
  }

  async generateUniqueRandomKey(length = 10): Promise<string> {
    let randomKey: string;
    let existID;
    do {
      randomKey = generateRandomString(length);
      existID = await this.count({ key: randomKey });
    } while (existID > 0);
    return randomKey;
  }

  async getSpaceMock(param: { active: boolean; id: string }) {
    return {
      id: generateRandomString(10),
      domain: 'nano-hard',
    };
  }
}
