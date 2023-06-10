import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { SeriesModule } from './series/series.module';
import { TagsModule } from './tags/tags.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        UsersModule,
        AuthModule,
        RolesModule,
        PermissionsModule,
        SeriesModule,
        TagsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
