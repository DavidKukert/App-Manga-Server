import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
    constructor(private readonly prismaService: PrismaService) {}

    create({ name, description }: CreateRoleDto) {
        return this.prismaService.role.create({
            data: {
                name,
                description,
            },
        });
    }

    findAll() {
        return this.prismaService.role.findMany();
    }

    findOne(id: string) {
        return this.prismaService.role.findUniqueOrThrow({
            where: {
                id,
            },
        });
    }

    update(id: string, { name, description }: UpdateRoleDto) {
        return this.prismaService.role.update({
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
        return this.prismaService.role.delete({
            where: {
                id,
            },
        });
    }
}
