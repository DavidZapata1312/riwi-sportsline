import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { User } from '../user/entities/user.entity';

export async function seedClients(clientRepository: Repository<Client>, users: User[], count = 10) {
  const clients: Client[] = [];

  for (let i = 0; i < count; i++) {
    const client = clientRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      user: faker.helpers.arrayElement(users),
    });
    clients.push(client);
  }

  await clientRepository.save(clients);
  console.log(`✅ ${count} clientes creados.`);
  return clients;
}
