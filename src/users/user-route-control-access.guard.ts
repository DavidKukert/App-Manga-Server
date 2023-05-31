import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../auth/decorators/req-permissions.decorator';
import { UsersService } from 'src/users/users.service';
import { PayloadJwt } from '../auth/auth.service';

@Injectable()
export class UserRouteControlAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermOrRoles = this.reflector.getAllAndOverride<{
      roles: string[];
      permissions: string[];
    }>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermOrRoles) {
      return true;
    }
    const {
      user: userReq,
      params,
    }: { user: PayloadJwt; params: { id: string } } = context
      .switchToHttp()
      .getRequest();
    const user = await this.usersService.findOne(userReq.sub);

    if (user.id === params.id && userReq.sub === params.id) {
      return true;
    }

    return user.roles.some(({ name, permissions }) => {
      return (
        requiredPermOrRoles.roles.includes(name) ||
        permissions.some(({ name }) => {
          return requiredPermOrRoles.permissions.includes(name);
        })
      );
    });
  }
}
