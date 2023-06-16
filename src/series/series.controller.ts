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
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { ParamsRouteDto } from 'src/dto/params-route.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Public } from 'src/auth/decorators/public.decorator';
import { ControlAccessGuard } from 'src/auth/control-access.guard';
import { ReqPermissions } from 'src/auth/decorators/req-permissions.decorator';
import * as fsExtra from 'fs-extra';

@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) {}

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['create_series'])
    @Post()
    async create(@Body() createSeriesDto: CreateSeriesDto) {
        try {
            return await this.seriesService.create(createSeriesDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException('Serie already registered!');
                }
            }
        }
    }

    @Public()
    @Get()
    findAll() {
        return this.seriesService.findAll();
    }

    @Public()
    @Get(':id')
    async findOne(@Param() { id }: ParamsRouteDto) {
        try {
            return await this.seriesService.findOne(id);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Serie Not Found');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['update_series'])
    @Patch(':id')
    async update(
        @Param() { id }: ParamsRouteDto,
        @Body() updateSeriesDto: UpdateSeriesDto,
    ) {
        try {
            return await this.seriesService.update(id, updateSeriesDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'Serie already registered with this title!',
                    );
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException('Serie Not Found');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['remove_series'])
    @Delete(':id')
    async remove(@Param() { id }: ParamsRouteDto) {
        try {
            const result = await this.seriesService.remove(id);
            if (result) {
                await fsExtra.remove(`uploads/series/${result.id}`);
                return { msg: 'Successfully removed serie' };
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Serie Not Found');
                }
            }
        }
    }
}
