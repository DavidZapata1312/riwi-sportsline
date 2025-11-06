import {Entity, Column, ManyToMany} from 'typeorm';
import { baseEntity } from '../../shared/base.entity';
import { Delivery } from '../../delivery/entities/delivery.entity';

@Entity('products')
export class Product extends baseEntity {

    @Column({  nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    category: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    stock: number;

    @ManyToMany(() => Delivery, (delivery) => delivery.products)
    deliveries: Delivery[];
}
