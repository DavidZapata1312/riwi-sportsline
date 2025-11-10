import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private clientRepository: Repository<Client>) {}

  create(dto: CreateClientDto) {
    const client = this.clientRepository.create(dto);
    return this.clientRepository.save(client);
  }

  findOne(id: number) {
    return this.clientRepository.findOneBy({ id });
  }

  findAll() {
    return this.clientRepository.find();
  }
}
