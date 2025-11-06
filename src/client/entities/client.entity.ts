import {Entity, Column, OneToMany} from 'typeorm';
import { baseEntity } from '../../shared/base.entity';
import { Delivery } from "../../delivery/entities/delivery.entity";

@Entity('clients')
export class Client extends baseEntity {
    @Column()
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    address?: string;

    @OneToMany(() => Delivery, (delivery) => delivery.client)
    deliveries: Delivery[];
}
