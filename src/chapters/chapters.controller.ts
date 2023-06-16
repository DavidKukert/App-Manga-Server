import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ParamsRouteDto } from 'src/dto/params-route.dto';
import { ControlAccessGuard } from 'src/auth/control-access.guard';
import { ReqPermissions } from 'src/auth/decorators/req-permissions.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import * as fsExtra from 'fs-extra';

@Controller('chapters')
export class ChaptersController {
    constructor(private readonly chaptersService: ChaptersService) {}

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['create_chapters'])
    @Post()
    async create(@Body() createChapterDto: CreateChapterDto) {
        try {
            return await this.chaptersService.create(createChapterDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'Chapter already registered!',
                    );
                }
            }
        }
    }

    @Public()
    @Get()
    findAll() {
        return this.chaptersService.findAll();
    }

    @Public()
    @Get(':id')
    async findOne(@Param() { id }: ParamsRouteDto) {
        try {
            return await this.chaptersService.findOne(id);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Chapter Not Found');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['update_chapters'])
    @Patch(':id')
    async update(
        @Param() { id }: ParamsRouteDto,
        @Body() updateChapterDto: UpdateChapterDto,
    ) {
        try {
            return this.chaptersService.update(id, updateChapterDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'Chapter already registered with this number!',
                    );
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException('Chapter Not Found');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['remove_chapters'])
    @Delete(':id')
    async remove(@Param() { id }: ParamsRouteDto) {
        try {
            const result = await this.chaptersService.remove(id);
            if (result) {
                await fsExtra.remove(
                    `uploads/series/${result.serieId}/chapters/${result.id}`,
                );
                return { msg: 'Successfully removed chapter' };
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Chapter Not Found');
                }
            }
        }
    }
}
