import { Client } from 'src/client/entities/client.entity';
import { OrderDetail } from 'src/order/entities/order-detail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  orderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  // 🔹 Relación N:1 → muchos pedidos pertenecen a un cliente
  @ManyToOne(() => Client, (client) => client.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  // 🔹 Relación 1:N → un pedido tiene varios detalles
  @OneToMany(() => OrderDetail, (detail) => detail.order)
  details: OrderDetail[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
