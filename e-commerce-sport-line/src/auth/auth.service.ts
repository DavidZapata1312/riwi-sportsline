/* eslint-disable */
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // ----------------------------
  // REGISTER
  // ----------------------------
  async register(dto: AuthRegisterDto) {
    const userExists = await this.userService.findByEmail(dto.email);

    if (userExists) {
      throw new UnauthorizedException('Email already registered');
    }

    const newUser = await this.userService.create(dto);

    const tokens = await this.generateTokens(newUser.id, newUser.email, newUser.role);

    await this.setRefreshToken(newUser.id, tokens.refreshToken);

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      ...tokens,
    };
  }

  // ----------------------------
  // LOGIN
  // ----------------------------
  async login(dto: AuthLoginDto) {
    const user = await this.userService.findByEmailWithPassword(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    await this.setRefreshToken(user.id, tokens.refreshToken);

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  // ----------------------------
  // REFRESH TOKENS
  // ----------------------------
  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findByIdWithRefreshToken(userId);

    if (!user || !user.currentHashedRefreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Refresh token invalid');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    await this.setRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  // ----------------------------
  // LOGOUT
  // ----------------------------
  async logout(userId: number) {
    await this.userService.removeRefreshToken(userId);
    return { message: 'Logged out successfully' };
  }

  // ----------------------------
  // GENERATE TOKENS
  // ----------------------------
  async generateTokens(userId: number, email: string, role: string) {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId, email, role },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      },
    );
  
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );
  
    return { accessToken, refreshToken };
  }


  // ----------------------------
  // HASH & SAVE REFRESH TOKEN
  // ----------------------------
  async setRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.setCurrentRefreshToken(hashedRefreshToken, userId);
  }

  async refreshTokenFlow(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, { ignoreExpiration: false });

    return this.refreshTokens(decoded.sub, refreshToken);
  }
}
