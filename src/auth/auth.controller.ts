import {
    Controller,
    HttpStatus,
    HttpCode,
    Post,
    Body,
    Request,
    Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-In.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() { name, password }: SignInDto) {
        return this.authService.signIn(name, password);
    }

    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
