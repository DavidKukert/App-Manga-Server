import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreatePermissionDto implements Prisma.PermissionCreateInput {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @Matches(/^[^\s]+$/, {
        message: 'The Permission name must not contain any whitespace.',
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    description: string;
}
