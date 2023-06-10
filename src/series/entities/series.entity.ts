import { Serie as SerieBase } from '@prisma/client';

export class Series implements SerieBase {
    id: string;
    title: string;
    titleAlter: string;
    description: string;
    cover: string;
    releaseYear: string;
    folder: string;
    createdAt: Date;
    updatedAt: Date;
}
