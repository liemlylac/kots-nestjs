import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './services';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  // noinspection JSUnusedGlobalSymbols
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //const roles = this.reflector.getAll('roles', context);
    const resources = this.reflector.get('roles', context.getClass());
    const actions = this.reflector.get('roles', context.getHandler());
    if (!resources && !actions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return !!user;
  }
}
