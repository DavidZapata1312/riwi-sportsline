import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { User, UserRole } from '../user/entities/user.entity';

export async function seedUsers(userRepository: Repository<User>, count = 5) {
  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const user = userRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: '123456',
      role: i === 0 ? UserRole.ADMIN : UserRole.USER,
    });
    users.push(user);
  }

  await userRepository.save(users);
  console.log(`✅ ${count} usuarios creados.`);
  return users;
}
