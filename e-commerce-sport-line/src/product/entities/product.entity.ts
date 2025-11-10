import { OrderDetail } from 'src/order/entities/order-detail.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => OrderDetail, (detail) => detail.product)
  orderDetails: OrderDetail[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
