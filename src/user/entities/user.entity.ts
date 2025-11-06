import {Column, Entity, BeforeInsert, BeforeUpdate, OneToMany} from 'typeorm';
import { baseEntity } from '../../shared/base.entity';
import * as bcrypt from 'bcrypt';
import {UserType} from "../user.enum";
import {Delivery} from "../../delivery/entities/delivery.entity";

@Entity('users')
export class User extends baseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ type: 'enum', enum: UserType, default: UserType.STAFF })
    role: UserType;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (!this.password) return;

        if (this.password.startsWith('$2')) return;
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({ name: "current_hashed_refresh_token", nullable: true, select: false, type: 'text' })
    currentHashedRefreshToken?: string | null;


    @OneToMany(() => Delivery, (delivery) => delivery.user)
    deliveries: Delivery[];
}