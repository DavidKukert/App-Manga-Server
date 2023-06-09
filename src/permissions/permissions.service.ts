import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionsService {
    constructor(private readonly prismaService: PrismaService) {}

    create({ name, description }: CreatePermissionDto) {
        return this.prismaService.permission.create({
            data: {
                name,
                description,
                roles: {
                    connectOrCreate: {
                        create: {
                            name: 'admin',
                            description: 'Admin',
                        },
                        where: {
                            name: 'admin',
                        },
                    },
                },
            },
        });
    }

    findAll() {
        return this.prismaService.permission.findMany();
    }

    findOne(id: string) {
        return this.prismaService.permission.findUniqueOrThrow({
            where: {
                id,
            },
        });
    }

    update(id: string, { name, description }: UpdatePermissionDto) {
        return this.prismaService.permission.update({
            data: {
                name,
                description,
            },
            where: {
                id,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.permission.delete({
            where: {
                id,
            },
        });
    }
}
