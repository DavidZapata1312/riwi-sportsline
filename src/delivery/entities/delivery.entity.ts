import {Entity, Column, ManyToMany, JoinTable, ManyToOne} from 'typeorm';
import { baseEntity } from '../../shared/base.entity';
import { Client } from '../../client/entities/client.entity';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';


@Entity('deliveries')
export class Delivery extends baseEntity {
    @Column({ type: 'int', nullable: false })
    clientId: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
    totalAmount: number;

    @Column({ nullable: true })
    notes?: string;

    @ManyToOne(() => Client, (client) => client.deliveries, { eager: true, onDelete: 'CASCADE' })
    client: Client;

    // RELACIÓN: muchos deliveries tienen muchos productos
    @ManyToMany(() => Product, (product) => product.deliveries, { cascade: true })
    @JoinTable({
        name: 'delivery_products',
        joinColumn: { name: 'delivery_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
    })
    products: Product[];

    // RELACIÓN: un user puede gestionar muchos deliveries
    @ManyToOne(() => User, (user) => user.deliveries, { eager: true, onDelete: 'SET NULL' })
    user: User;
}
