import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Client } from './src/client/entities/client.entity';
import { OrderDetail } from './src/order/entities/order-detail.entity';
import { Order } from './src/order/entities/order.entity';
import { Product } from './src/product/entities/product.entity';
import { User } from './src/user/entities/user.entity';

config(); // Carga el .env

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Client, Product, Order, OrderDetail],
  migrations: ['src/migrations/*.ts'], // dónde guardas tus migraciones compiladas
});
