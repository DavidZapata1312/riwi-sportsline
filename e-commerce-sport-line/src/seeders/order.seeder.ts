import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { Order } from '../order/entities/order.entity';

export async function seedOrders(
  orderRepository: Repository<Order>,
  clients: Client[],
  count = 10,
) {
  const orders: Order[] = [];

  for (let i = 0; i < count; i++) {
    const client = faker.helpers.arrayElement(clients);
    const order = orderRepository.create({
      orderDate: faker.date.recent({ days: 30 }),
      totalAmount: 0, // se actualizará luego con detalles
      client,
    });
    orders.push(order);
  }

  await orderRepository.save(orders);
  console.log(`✅ ${count} pedidos creados.`);
  return orders;
}
