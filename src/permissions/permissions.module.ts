import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    controllers: [PermissionsController],
    providers: [PermissionsService],
    imports: [UsersModule],
})
export class PermissionsModule {}
