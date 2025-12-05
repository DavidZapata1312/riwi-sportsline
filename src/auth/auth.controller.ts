import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UseFilters,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggingInterceptor } from "../common/interceptors/logging.interceptor";
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { LoginAuthDto } from './dto/login.dto';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiResponse({ status: 200, description: 'User logged in, returns JWT.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    async login(@Body() loginDto: LoginAuthDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user with email and password' })
    @ApiResponse({ status: 201, description: 'User registered successfully.' })
    @ApiResponse({ status: 409, description: 'User already exists.' })
    async register(@Body() registerDto: LoginAuthDto) {
        return this.authService.register(registerDto);
    }

    @Get('google')
    @UseGuards(PassportAuthGuard('google'))
    @ApiOperation({ summary: 'Initiate Google OAuth2 login' })
    @ApiResponse({ status: 302, description: 'Redirect to Google OAuth2 consent screen.' })
    async googleAuth() {
        // This route will redirect the user to Google for authentication
    }

    @Get('google/callback')
    @UseGuards(PassportAuthGuard('google'))
    @ApiOperation({ summary: 'Google OAuth2 callback' })
    @ApiResponse({ status: 200, description: 'Google login successful, returns JWT.' })
    async googleAuthRedirect(@Req() req: any) {
        return this.authService.googleLogin(req.user);
    }
}
