import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeriesService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createSeriesDto: CreateSeriesDto) {
        return this.prismaService.serie.create({
            data: {
                title: createSeriesDto.title,
                titleAlter: JSON.stringify(createSeriesDto.titleAlter),
                description: createSeriesDto.description,
                cover: createSeriesDto.cover,
                releaseYear: createSeriesDto.releaseYear,
            },
        });
    }

    findAll() {
        return this.prismaService.serie.findMany();
    }

    findOne(id: string) {
        return this.prismaService.serie.findUniqueOrThrow({ where: { id } });
    }

    update(id: string, updateSeriesDto: UpdateSeriesDto) {
        return this.prismaService.serie.update({
            data: {
                title: updateSeriesDto.title,
                titleAlter: JSON.stringify(updateSeriesDto.titleAlter),
                description: updateSeriesDto.description,
                cover: updateSeriesDto.cover,
                releaseYear: updateSeriesDto.releaseYear,
            },
            where: { id },
        });
    }

    remove(id: string) {
        return this.prismaService.serie.delete({ where: { id } });
    }
}
