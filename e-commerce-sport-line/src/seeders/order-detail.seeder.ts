import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { OrderDetail } from '../order/entities/order-detail.entity';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';

export async function seedOrderDetails(
  detailRepository: Repository<OrderDetail>,
  orders: Order[],
  products: Product[],
  count = 20,
) {
  const details: OrderDetail[] = [];

  for (let i = 0; i < count; i++) {
    const order = faker.helpers.arrayElement(orders);
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 5 });
    const unitPrice = product.price;
    const subtotal = unitPrice * quantity;

    const detail = detailRepository.create({
      order,
      product,
      quantity,
      unitPrice,
      subtotal,
    });
    details.push(detail);
  }

  await detailRepository.save(details);
  console.log(`✅ ${count} detalles de pedido creados.`);

  // Actualizar totalAmount en cada pedido
  for (const order of orders) {
    const orderDetails = details.filter((d) => d.order.id === order.id);
    order.totalAmount = orderDetails.reduce((sum, d) => sum + d.subtotal, 0);
  }
}
