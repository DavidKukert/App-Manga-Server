import { User as UserModel } from '@prisma/client';

export class User implements UserModel {
    id: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
