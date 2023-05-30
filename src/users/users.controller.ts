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
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamsRouteDto } from '../dto/params-route.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

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
