import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createTagDto: CreateTagDto) {
        return this.prismaService.tag.create({
            data: createTagDto,
        });
    }

    findAll() {
        return this.prismaService.tag.findMany();
    }

    findOne(id: string) {
        return this.prismaService.tag.findUniqueOrThrow({ where: { id } });
    }

    update(id: string, updateTagDto: UpdateTagDto) {
        return this.prismaService.tag.update({
            data: updateTagDto,
            where: { id },
        });
    }

    remove(id: string) {
        return this.prismaService.tag.delete({ where: { id } });
    }
}
