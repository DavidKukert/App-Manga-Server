import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChaptersService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createChapterDto: CreateChapterDto) {
        createChapterDto.content = JSON.stringify(createChapterDto.content);

        return this.prismaService.chapter.create({
            data: createChapterDto,
        });
    }

    findAll() {
        return this.prismaService.chapter.findMany();
    }

    findOne(id: string) {
        return this.prismaService.chapter.findUniqueOrThrow({ where: { id } });
    }

    update(id: string, updateChapterDto: UpdateChapterDto) {
        updateChapterDto.content = JSON.stringify(updateChapterDto.content);

        return this.prismaService.chapter.update({
            data: updateChapterDto,
            where: { id },
        });
    }

    remove(id: string) {
        return this.prismaService.chapter.delete({ where: { id } });
    }
}
