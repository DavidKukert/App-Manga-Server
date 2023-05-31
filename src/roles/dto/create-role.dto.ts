import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateRoleDto implements Prisma.RoleCreateInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @Matches(/^[^\s]+$/, {
    message: 'The Role name must not contain any whitespace.',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;
}
