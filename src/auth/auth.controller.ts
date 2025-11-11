import {
    Controller,
    Post,
    Body,
    UseGuards,
    UseInterceptors,
    UseFilters,

} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from "../common/interceptors/logging.interceptor";
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { LoginAuthDto } from './dto/login.dto';

@Controller('auth')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginAuthDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: LoginAuthDto) {
        return this.authService.register(registerDto);
    }
}
