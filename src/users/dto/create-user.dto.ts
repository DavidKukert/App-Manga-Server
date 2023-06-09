import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserDto implements Prisma.UserCreateInput {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
