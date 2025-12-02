import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,

    // 🔐 Módulo de JWT (ACCESS TOKEN)
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    UserService,

    // Estrategias Passport
    JwtStrategy,
    RefreshTokenStrategy,
  ],

  // 👇 Para que otros módulos (si los tienes) puedan usar AuthService
  exports: [AuthService],
})
export class AuthModule {}
