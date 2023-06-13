import { Chapter as ChapterBase } from '@prisma/client';

export class Chapter implements ChapterBase {
    id: string;
    number: string;
    title: string;
    content: string;
    serieId: string;
    createdAt: Date;
    updatedAt: Date;
}
