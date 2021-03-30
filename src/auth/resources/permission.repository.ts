import { EntityRepository, Repository } from 'typeorm';
import { PermissionEntity } from '../entities';

@EntityRepository(PermissionEntity)
export class PermissionRepository extends Repository<PermissionEntity> {}
