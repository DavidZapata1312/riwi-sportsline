import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => User, (user) => user.clients, {
    onDelete: 'CASCADE', // Si se elimina el usuario, se eliminan sus clientes
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // 🔹 1:N → un cliente puede tener muchos pedidos
  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
