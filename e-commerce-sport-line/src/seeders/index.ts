import { config } from 'dotenv';
import dataSource from '../../typeorm-cli';

import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/user/entities/role.entity';
import { User } from '../user/entities/user.entity';
import { Client } from '../client/entities/client.entity';
import { Product } from '../product/entities/product.entity';
import { Order } from '../order/entities/order.entity';
import { OrderDetail } from '../order/entities/order-detail.entity';

import { seedPermissions } from './permission.seeder';
import { seedRoles } from './role.seeder';
import { seedUsers } from './user.seeder';
import { seedClients } from './client.seeder';
import { seedProducts } from './product.seeder';
import { seedOrders } from './order.seeder';
import { seedOrderDetails } from './order-detail.seeder';

config();

async function main() {
  const connection = await dataSource.initialize();
  console.log('🌱 Iniciando seeders...');

  const permRepo = connection.getRepository(Permission);
  const roleRepo = connection.getRepository(Role);
  const userRepo = connection.getRepository(User);
  const clientRepo = connection.getRepository(Client);
  const productRepo = connection.getRepository(Product);
  const orderRepo = connection.getRepository(Order);
  const detailRepo = connection.getRepository(OrderDetail);

  const roles = await seedRoles(roleRepo);
  const permissions = await seedPermissions(permRepo); // <-- nuevo
  const users = await seedUsers(userRepo, roles, permissions, 5);
  const clients = await seedClients(clientRepo, users, 10);
  const products = await seedProducts(productRepo, users, 10);
  const orders = await seedOrders(orderRepo, clients, 10);
  await seedOrderDetails(detailRepo, orders, products, 20);

  await connection.destroy();
  console.log('✅ Seed completo.');
}

main().catch((err) => console.error('❌ Error en seed:', err));
