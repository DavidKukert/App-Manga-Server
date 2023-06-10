import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateSeriesDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    titleAlter?: string[];

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    cover: string;

    @IsOptional()
    @IsString()
    @IsNumberString()
    releaseYear?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    tags?: string[];
}
