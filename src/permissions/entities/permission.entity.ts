import { Permission as PermissionBase } from '@prisma/client';

export class Permission implements PermissionBase {
    id: string;
    name: string;
    description: string;
}
