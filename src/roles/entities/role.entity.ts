import { Role as RoleBase } from '@prisma/client';

export class Role implements RoleBase {
  id: string;
  name: string;
  description: string;
}
