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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamsRouteDto } from '../dto/params-route.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserRouteControlAccessGuard } from './user-route-control-access.guard';
import { ReqPermissions } from 'src/auth/decorators/req-permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error);
        // Lida com erros específicos do Prisma
        if (error.code === 'P2002') {
          throw new BadRequestException('Name already registered!');
        }
      }
      // Lida com outros erros
      throw new BadRequestException('Error');
    }
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param() { id }: ParamsRouteDto) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User Not Found');
        }
      }
    }
  }

  @UseGuards(UserRouteControlAccessGuard)
  @ReqPermissions(['admin'], ['update_others_users'])
  @Patch(':id')
  async update(
    @Param() { id }: ParamsRouteDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error);
        // Lida com erros específicos do Prisma
        if (error.code === 'P2002') {
          throw new BadRequestException('Name already registered!');
        }
        if (error.code === 'P2025') {
          throw new NotFoundException('User Not Found');
        }
      }
      // Lida com outros erros
      throw new BadRequestException('Error');
    }
  }

  @UseGuards(UserRouteControlAccessGuard)
  @ReqPermissions(['admin'], ['delete_others_users'])
  @Delete(':id')
  async remove(@Param() { id }: ParamsRouteDto) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User Not Found');
        }
      }
    }
  }
}
