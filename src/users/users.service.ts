import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private passToHash(pass: string) {
    const saltOrRounds = 10;
    const salt = bcrypt.genSaltSync(saltOrRounds);
    return bcrypt.hashSync(pass, salt);
  }

  checkPassHash(pass: string, passHash: string) {
    return bcrypt.compareSync(pass, passHash);
  }

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.passToHash(createUserDto.password);
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password && typeof updateUserDto.password === 'string')
      updateUserDto.password = this.passToHash(updateUserDto.password);
    return this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }

  findBy(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({ where: filter });
  }
}
