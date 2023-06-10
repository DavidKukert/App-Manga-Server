import { Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateTagDto implements Prisma.TagCreateInput {
    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsString()
    type: string;
}
