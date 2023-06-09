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

    create({ name, password }: CreateUserDto) {
        return this.prismaService.user.create({
            data: {
                name,
                password: this.passToHash(password),
                roles: {
                    connectOrCreate: {
                        create: {
                            name: 'user',
                            description: 'User',
                        },
                        where: {
                            name: 'user',
                        },
                    },
                },
            },
        });
    }

    findAll() {
        return this.prismaService.user.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
    }

    findOne(id: string) {
        return this.prismaService.user.findUniqueOrThrow({
            where: { id },
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
    }

    update(id: string, { name, password }: UpdateUserDto) {
        const data: UpdateUserDto = {
            name,
        };

        if (password && typeof password === 'string')
            data.password = this.passToHash(password);

        return this.prismaService.user.update({
            data,
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
