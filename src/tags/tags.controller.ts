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
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ParamsRouteDto } from 'src/dto/params-route.dto';
import { ControlAccessGuard } from 'src/auth/control-access.guard';
import { ReqPermissions } from 'src/auth/decorators/req-permissions.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['create_tags'])
    @Post()
    async create(@Body() createTagDto: CreateTagDto) {
        try {
            return await this.tagsService.create(createTagDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException('Tag already registered!');
                }
            }
        }
    }

    @Public()
    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Public()
    @Get(':id')
    async findOne(@Param() { id }: ParamsRouteDto) {
        try {
            return await this.tagsService.findOne(id);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Tag Not Found');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['update_tags'])
    @Patch(':id')
    async update(
        @Param() { id }: ParamsRouteDto,
        @Body() updateTagDto: UpdateTagDto,
    ) {
        try {
            return await this.tagsService.update(id, updateTagDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'Tag already registered with this slug!',
                    );
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException('Tag Not Found');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['remove_tags'])
    @Delete(':id')
    async remove(@Param() { id }: ParamsRouteDto) {
        try {
            return await this.tagsService.remove(id);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Tag Not Found');
                }
            }
        }
    }
}
