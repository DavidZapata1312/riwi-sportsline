import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDTO } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(Delivery)
        private readonly deliveryRepository: Repository<Delivery>,
    ) {}

    async create(createDeliveryDto: CreateDeliveryDTO) {
        const delivery = this.deliveryRepository.create(createDeliveryDto);
        return await this.deliveryRepository.save(delivery);
    }

    async findAll() {
        return await this.deliveryRepository.find();
    }

    async findOne(id: number) {
        const delivery = await this.deliveryRepository.findOne({ where: { id } });
        if (!delivery) throw new NotFoundException(`Delivery with ID ${id} not found`);
        return delivery;
    }

    async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
        const delivery = await this.findOne(id);
        Object.assign(delivery, updateDeliveryDto);
        return await this.deliveryRepository.save(delivery);
    }

    async remove(id: number) {
        const delivery = await this.findOne(id);
        return await this.deliveryRepository.remove(delivery);
    }
}
