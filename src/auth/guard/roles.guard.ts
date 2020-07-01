import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../service/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  // noinspection JSUnusedGlobalSymbols
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //const roles = this.reflector.getAll('roles', context);
    const resources = this.reflector.get<string[]>('roles', context.getClass());
    const actions = this.reflector.get<string[]>('roles', context.getHandler());
    if (!resources && !actions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return await this.authService.validatePermission(
      user.role,
      resources,
      actions,
    );
  }
}
