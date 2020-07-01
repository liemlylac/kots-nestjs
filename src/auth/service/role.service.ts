import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@core/services/logger-service';
import { Role } from '../entity/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entity/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  getList() {
    return this.roleRepository.find();
  }
  async getPermission(role) {
    return await this.permissionRepository
      .createQueryBuilder('permission')
      .innerJoinAndSelect('permission.role', 'role')
      .innerJoinAndSelect('permission.resource', 'resource')
      .innerJoinAndSelect('permission.action', 'action')
      .where('role.code = :role', { role: role })
      .andWhere('permission.isAllow = 1')
      .getMany();
  }

  add(role: Role) {
    return this.roleRepository.save(role);
  }

  edit(id, role: Partial<Role>) {
    return this.roleRepository.update(id, role);
  }

  remove(id) {
    return this.roleRepository.delete(id);
  }
}
