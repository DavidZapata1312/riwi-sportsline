import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Client} from "./entities/client.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Client]) // <--- ESTA ES LA CLAVE
    ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
