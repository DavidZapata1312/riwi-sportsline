import {
    Injectable,
    UnauthorizedException,
    ConflictException } from '@nestjs/common';
import { LoginAuthDto } from "./dto/login.dto";

interface User {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    private users: User[] = [];

    async login ({ email, password }: LoginAuthDto) {
        const user = this.users.find((user) => user.email === email);
        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return {
            message: 'Welcome back',
            user: {email: user.email},
        }
    }
    async register({ email, password }: LoginAuthDto) {
        const existingUser = this.users.find((user) => user.email === email);
        if (existingUser) {
            throw new ConflictException('The user already exists');
        }

        this.users.push({ email, password });
        return {
            message: 'Successfully registered',
            user: { email },
        };
    }
}