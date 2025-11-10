import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.clientService.create(dto);
  }

  @Get(':id')
  findOne(@Param() id: number) {
    return this.clientService.findOne(id);
  }

  @Get()
  findAll() {
    return this.clientService.findAll();
  }
}
