import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDTO } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
    constructor(
        @Inject(ClientService)
        private readonly ClientService: ClientService,
    ) {}

    @Post()
    create(@Body() createClientDto: CreateClientDTO) {
        return this.ClientService.create(createClientDto);
    }

    @Get()
    findAll() {
        return this.ClientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ClientService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        return this.ClientService.update(+id, updateClientDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ClientService.remove(+id);
    }
}
