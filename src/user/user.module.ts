import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]) // <--- ESTA ES LA CLAVE
    ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
