import { config } from 'dotenv';
import dataSource from '../../typeorm-cli';

import { User } from '../user/entities/user.entity';
import { Client } from '../client/entities/client.entity';
import { Product } from '../product/entities/product.entity';
import { Order } from '../order/entities/order.entity';
import { OrderDetail } from '../order/entities/order-detail.entity';

import { seedUsers } from './user.seeder';
import { seedClients } from './client.seeder';
import { seedProducts } from './product.seeder';
import { seedOrders } from './order.seeder';
import { seedOrderDetails } from './order-detail.seeder';

config();

async function main() {
  const connection = await dataSource.initialize();
  console.log('🌱 Iniciando seeders...');

  const userRepo = connection.getRepository(User);
  const clientRepo = connection.getRepository(Client);
  const productRepo = connection.getRepository(Product);
  const orderRepo = connection.getRepository(Order);
  const detailRepo = connection.getRepository(OrderDetail);

  const users = await seedUsers(userRepo, 5);
  const clients = await seedClients(clientRepo, users, 10);
  const products = await seedProducts(productRepo, users, 10);
  const orders = await seedOrders(orderRepo, clients, 10);
  await seedOrderDetails(detailRepo, orders, products, 20);

  await connection.destroy();
  console.log('✅ Seed completo.');
}

main().catch((err) => console.error('❌ Error en seed:', err));
