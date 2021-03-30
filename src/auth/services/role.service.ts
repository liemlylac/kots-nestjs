import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@config/config.service';
import { RoleEntity } from '../entities';
import { PermissionRepository, RoleRepository } from '../resources';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly roleRepository: RoleRepository,
    private readonly permissionResource: PermissionRepository,
  ) {}

  getList() {
    return this.roleRepository.find();
  }

  async getPermission(role) {
    return await this.permissionResource
      .createQueryBuilder('permission')
      .innerJoinAndSelect('permission.role', 'role')
      .innerJoinAndSelect('permission.resource', 'resource')
      .innerJoinAndSelect('permission.action', 'action')
      .where('role.code = :role', { role: role })
      .andWhere('permission.isAllow = 1')
      .getMany();
  }

  add(role: RoleEntity) {
    return this.roleRepository.save(role);
  }

  edit(id, role: Partial<RoleEntity>) {
    return this.roleRepository.update(id, role);
  }

  remove(id) {
    return this.roleRepository.delete(id);
  }
}
