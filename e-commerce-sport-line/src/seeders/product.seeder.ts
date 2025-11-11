import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';

export async function seedProducts(
  productRepository: Repository<Product>,
  users: User[],
  count = 10,
) {
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const product = productRepository.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 200 })),
      stock: faker.number.int({ min: 0, max: 100 }),
    });
    products.push(product);
  }

  await productRepository.save(products);
  console.log(`✅ ${count} productos creados.`);
  return products;
}
