import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateChapterDto {
    @IsNotEmpty()
    @IsString()
    @IsNumberString()
    number: string;

    @IsOptional()
    @IsString()
    title?: string;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    content: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    serieId: string;
}
