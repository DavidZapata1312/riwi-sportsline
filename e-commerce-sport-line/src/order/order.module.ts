import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService, TypeOrmModule],
})
export class OrderModule {}
