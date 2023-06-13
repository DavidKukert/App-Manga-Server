import { Controller, Post } from '@nestjs/common';

@Controller('uploads')
export class UploadsController {
    @Post('series/:id/cover')
    uploadCover() {
        return 'upload cover image';
    }

    @Post('chapters/:id/pages')
    uploadChapterPages() {
        return 'upload chapter pages image';
    }
}
