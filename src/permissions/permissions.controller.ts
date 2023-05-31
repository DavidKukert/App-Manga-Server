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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ParamsRouteDto } from 'src/dto/params-route.dto';
import { ControlAccessGuard } from 'src/auth/control-access.guard';
import { ReqPermissions } from 'src/auth/decorators/req-permissions.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(ControlAccessGuard)
  @ReqPermissions(['admin'], [])
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    try {
      return await this.permissionsService.create(createPermissionDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Permission already registered!');
        }
      }
    }
  }

  @UseGuards(ControlAccessGuard)
  @ReqPermissions(['admin'], [])
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @UseGuards(ControlAccessGuard)
  @ReqPermissions(['admin'], [])
  @Get(':id')
  async findOne(@Param() { id }: ParamsRouteDto) {
    try {
      return await this.permissionsService.findOne(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Permission Not Found');
        }
      }
    }
  }

  @UseGuards(ControlAccessGuard)
  @ReqPermissions(['admin'], [])
  @Patch(':id')
  async update(
    @Param() { id }: ParamsRouteDto,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    try {
      return await this.permissionsService.update(id, updatePermissionDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Permission already registered with this name!',
          );
        }
        if (error.code === 'P2025') {
          throw new NotFoundException('Permission Not Found');
        }
      }
    }
  }

  @UseGuards(ControlAccessGuard)
  @ReqPermissions(['admin'], [])
  @Delete(':id')
  async remove(@Param() { id }: ParamsRouteDto) {
    try {
      return await this.permissionsService.remove(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Permission Not Found');
        }
      }
    }
  }
}
