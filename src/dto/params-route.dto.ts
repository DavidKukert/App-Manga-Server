import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParamsRouteDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;
}
