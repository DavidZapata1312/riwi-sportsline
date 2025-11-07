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
import { OrderDetail } from 'src/order/entities/order-detail.entity';

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

  // 🔹 Relación N:1 → muchos productos pertenecen a un usuario
  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'CASCADE', // si se elimina el usuario, se eliminan sus productos
  })
  @JoinColumn({ name: 'user_id' }) // nombre de la FK en la base de datos
  user: User;

  // 🔹 1:N → un producto puede estar en muchos detalles de pedido
  @OneToMany(() => OrderDetail, (detail) => detail.product)
  orderDetails: OrderDetail[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
