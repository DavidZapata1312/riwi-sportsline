import {
    Injectable,
    UnauthorizedException,
    ConflictException } from '@nestjs/common';
import { LoginAuthDto } from "./dto/login.dto";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async login ({ email, password }: LoginAuthDto) {
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role'],
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            message: 'Welcome back',
            access_token: accessToken,
            user: { id: user.id, email: user.email, role: user.role },
        };
    }

    async register({ email, password }: LoginAuthDto) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('The user already exists');
        }

        const user = this.userRepository.create({
            name: email.split('@')[0],
            email,
            password,
        });
        const savedUser = await this.userRepository.save(user);

        return {
            message: 'Successfully registered',
            user: { id: savedUser.id, email: savedUser.email },
        };
    }

    async googleLogin(googleUser: { email?: string | undefined; googleId?: string | undefined; name?: string | undefined }) {
        if (!googleUser || !googleUser.email) {
            throw new UnauthorizedException('Google account does not have a public email');
        }

        let user = await this.userRepository.findOne({
            where: [
                { googleId: googleUser.googleId },
                { email: googleUser.email },
            ],
        });

        if (!user) {
            const randomPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

            user = this.userRepository.create({
                name: googleUser.name ?? googleUser.email.split('@')[0],
                email: googleUser.email,
                password: randomPassword,
                googleId: googleUser.googleId,
            });

            user = await this.userRepository.save(user);
        } else if (!user.googleId && googleUser.googleId) {
            user.googleId = googleUser.googleId;
            user = await this.userRepository.save(user);
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            message: 'Google login successful',
            access_token: accessToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                googleId: user.googleId,
            },
        };
    }
}
