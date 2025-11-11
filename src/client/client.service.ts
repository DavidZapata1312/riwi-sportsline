import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) {}

    async create(createClientDto: CreateClientDTO) {
        const client = this.clientRepository.create(createClientDto);
        return await this.clientRepository.save(client);
    }

    async findAll() {
        return await this.clientRepository.find();
    }

    async findOne(id: number) {
        const client = await this.clientRepository.findOne({ where: { id } });
        if (!client) throw new NotFoundException(`Client with ID ${id} not found`);
        return client;
    }

    async update(id: number, updateClientDto: UpdateClientDto) {
        const client = await this.findOne(id);
        Object.assign(client, updateClientDto);
        return await this.clientRepository.save(client);
    }

    async remove(id: number) {
        const client = await this.findOne(id);
        return await this.clientRepository.remove(client);
    }
}
