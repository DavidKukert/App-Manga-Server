import { Module, Global } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [PrismaModule],
    exports: [UsersService],
})
export class UsersModule {}
