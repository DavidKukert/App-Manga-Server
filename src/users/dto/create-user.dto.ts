import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  id?: string;
  name: string;
  password: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
