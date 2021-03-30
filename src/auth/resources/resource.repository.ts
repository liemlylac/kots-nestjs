import { EntityRepository, Repository } from 'typeorm';
import { ResourceEntity } from '../entities';

@EntityRepository(ResourceEntity)
export class ResourceRepository extends Repository<ResourceEntity> {}
