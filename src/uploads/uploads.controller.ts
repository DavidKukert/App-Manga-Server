import {
    Controller,
    NotFoundException,
    BadRequestException,
    Param,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ControlAccessGuard } from 'src/auth/control-access.guard';
import { ReqPermissions } from 'src/auth/decorators/req-permissions.decorator';
import { ParamsRouteDto } from 'src/dto/params-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('uploads')
export class UploadsController {
    constructor(private readonly prismaService: PrismaService) {}

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['create_series', 'update_series'])
    @Post('series/:id/cover')
    @UseInterceptors(
        FileInterceptor('serieCover', {
            storage: diskStorage({
                destination(req, file, callback) {
                    const destination = `uploads/series/${req.params.id}`;
                    if (!existsSync(destination)) {
                        mkdirSync(destination, { recursive: true });
                    }
                    callback(null, destination);
                },
                filename(req, file, callback) {
                    callback(null, `cover${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async uploadCover(
        @Param() { id }: ParamsRouteDto,
        @UploadedFile() serieCover: Express.Multer.File,
    ) {
        try {
            return await this.prismaService.serie.update({
                data: {
                    cover: serieCover.filename,
                },
                where: { id },
            });
        } catch (error) {
            return error;
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['create_chapters', 'update_chapters'])
    @Post('chapters/:id/pages')
    @UseInterceptors(FilesInterceptor('pagesChapter'))
    async uploadChapterPages(
        @Param() { id }: ParamsRouteDto,
        @UploadedFiles() pagesChapter: Array<Express.Multer.File>,
    ) {
        const chapter = await this.prismaService.chapter.findUnique({
            where: { id },
        });

        if (!chapter) {
            throw new NotFoundException('Chapter Not Found');
        }

        try {
            const destination = `uploads/series/${chapter.serieId}/chapters/${chapter.id}`;
            if (!existsSync(destination)) {
                mkdirSync(destination, { recursive: true });
            }

            const result = await this.saveFilesInDisk(
                pagesChapter,
                destination,
            );

            await this.prismaService.chapter.update({
                data: {
                    content: JSON.stringify(result),
                },
                where: { id },
            });

            return result;
        } catch (error) {
            return new BadRequestException(
                'Upload failed, please try again later',
            );
        }
    }

    private async saveFilesInDisk(
        files: Express.Multer.File[],
        directory: string,
    ) {
        const promises = files.map((file) => {
            this.saveFile(file, directory);
            return file.originalname;
        });
        return await Promise.all(promises);
    }

    private async saveFile(
        file: Express.Multer.File,
        directory: string,
    ): Promise<void> {
        return new Promise((resolve, reject) => {
            const stream = createWriteStream(
                `${directory}/${file.originalname}`,
            );
            stream.on('open', () => {
                stream.write(file.buffer);
                stream.end();
                resolve();
            });
            stream.on('error', (error) => {
                reject(error);
            });
        });
    }
}
