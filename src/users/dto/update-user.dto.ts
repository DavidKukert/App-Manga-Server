import { Prisma } from '@prisma/client';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  id?: string | Prisma.StringFieldUpdateOperationsInput;
  name?: string | Prisma.StringFieldUpdateOperationsInput;
  password?: string | Prisma.StringFieldUpdateOperationsInput;
  createdAt?: string | Date | Prisma.DateTimeFieldUpdateOperationsInput;
  updatedAt?: string | Prisma.DateTimeFieldUpdateOperationsInput | Date;
}
