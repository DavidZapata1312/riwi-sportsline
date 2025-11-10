import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}

  create(dto: CreateOrderDto) {
    const order = this.orderRepository.create(dto);
    return this.orderRepository.save(order);
  }

  findOne(id: number) {
    return this.orderRepository.findOneBy({ id });
  }

  findAll() {
    return this.orderRepository.find();
  }
}
