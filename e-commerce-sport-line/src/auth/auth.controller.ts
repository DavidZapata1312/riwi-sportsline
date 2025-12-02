/* eslint-disable */
import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto, RefreshTokenDto } from './dto/auth.dtos';
import { RefreshAuthGuard } from '../common/guard/refresh-auth.guard';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ----------------------------
  // REGISTER
  // ----------------------------
  @Post('register')
  async register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto);
  }

  // ----------------------------
  // LOGIN
  // ----------------------------
  @Post('login')
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }

  // ---------------------------- 
  // REFRESH TOKENS
  // ----------------------------
  @Post('refresh')        
  @UseGuards(RefreshAuthGuard)
  refreshTokens(@Req() req: any) {
    return this.authService.refreshTokens(
      req.user.sub,
      req.user.refreshToken,
    );
  }



  // ----------------------------
  // LOGOUT
  // ----------------------------
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: any) {
    return this.authService.logout(req.user.id);
  }
}
