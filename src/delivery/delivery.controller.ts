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
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDTO } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('Delivery')
export class DeliveryController {
    constructor(
        @Inject(DeliveryService)
        private readonly deliveryService: DeliveryService,
    ) {}

    @Post()
    create(@Body() createDeliveryDto: CreateDeliveryDTO) {
        return this.deliveryService.create(createDeliveryDto);
    }

    @Get()
    findAll() {
        return this.deliveryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.deliveryService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
        return this.deliveryService.update(+id, updateDeliveryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deliveryService.remove(+id);
    }
}
