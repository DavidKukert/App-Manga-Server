import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'reqPermOrRoles';
export const ReqPermissions = (roles: string[], permissions: string[]) =>
  SetMetadata(PERMISSIONS_KEY, { roles, permissions });
