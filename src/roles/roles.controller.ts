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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ParamsRouteDto } from 'src/dto/params-route.dto';
import { ControlAccessGuard } from 'src/auth/control-access.guard';
import { ReqPermissions } from 'src/auth/decorators/req-permissions.decorator';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['create_roles'])
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto) {
        try {
            return await this.rolesService.create(createRoleDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException('Role already registered!');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['findall_roles'])
    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['findone_roles'])
    @Get(':id')
    async findOne(@Param() { id }: ParamsRouteDto) {
        try {
            return await this.rolesService.findOne(id);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Role Not Found');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['update_roles'])
    @Patch(':id')
    async update(
        @Param() { id }: ParamsRouteDto,
        @Body() updateRoleDto: UpdateRoleDto,
    ) {
        try {
            return await this.rolesService.update(id, updateRoleDto);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException(
                        'Role already registered with this name!',
                    );
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException('Role Not Found');
                }
            }
        }
    }

    @UseGuards(ControlAccessGuard)
    @ReqPermissions(['admin'], ['remove_roles'])
    @Delete(':id')
    async remove(@Param() { id }: ParamsRouteDto) {
        try {
            return await this.rolesService.remove(id);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('Role Not Found');
                }
            }
        }
    }
}
