/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Leer token desde Authorization
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET, // Debe estar en .env
    });
  }

  async validate(payload: { sub: number; email: string; role: string }) {
    // Opcional: validar usuario real en BD
    const user = await this.userService.findOne(payload.sub);

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      ...(user ? { name: user.name } : {}),
    };
  }
}
