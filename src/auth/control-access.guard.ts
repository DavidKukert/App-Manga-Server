import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './decorators/req-permissions.decorator';
import { UsersService } from 'src/users/users.service';
import { PayloadJwt } from './auth.service';

@Injectable()
export class ControlAccessGuard implements CanActivate {
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
        const { user: userReq }: { user: PayloadJwt } = context
            .switchToHttp()
            .getRequest();
        const user = await this.usersService.findOne(userReq.sub);

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
