import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const entities = ['Roles', 'Permissions', 'Series', 'Tags'];
    const actions = ['Create', 'FindAll', 'FindOne', 'Update', 'Remove'];
    for (const entity of entities) {
        for (const action of actions) {
            await prisma.permission.upsert({
                create: {
                    name: `${action.toLowerCase()}_${entity.toLowerCase()}`,
                    description: `${action} ${entity}`,
                    roles: {
                        connectOrCreate: {
                            where: {
                                name: 'admin',
                            },
                            create: {
                                name: 'admin',
                                description: 'Admin',
                            },
                        },
                    },
                },
                update: {
                    name: `${action.toLowerCase()}_${entity.toLowerCase()}`,
                    description: `${action} ${entity}`,
                    roles: {
                        connectOrCreate: {
                            where: {
                                name: 'admin',
                            },
                            create: {
                                name: 'admin',
                                description: 'Admin',
                            },
                        },
                    },
                },
                where: {
                    name: `${action.toLowerCase()}_${entity.toLowerCase()}`,
                },
            });
        }
    }

    const actions_users = ['Update', 'Remove'];
    for (const action of actions_users) {
        await prisma.permission.upsert({
            create: {
                name: `${action.toLowerCase()}_others_users`,
                description: `${action} Others Users`,
                roles: {
                    connectOrCreate: {
                        where: {
                            name: 'admin',
                        },
                        create: {
                            name: 'admin',
                            description: 'Admin',
                        },
                    },
                },
            },
            update: {
                name: `${action.toLowerCase()}_others_users`,
                description: `${action} Others Users`,
                roles: {
                    connectOrCreate: {
                        where: {
                            name: 'admin',
                        },
                        create: {
                            name: 'admin',
                            description: 'Admin',
                        },
                    },
                },
            },
            where: {
                name: `${action.toLowerCase()}_others_users`,
            },
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
