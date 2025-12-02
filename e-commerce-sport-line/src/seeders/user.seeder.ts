/* eslint-disable */
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from 'src/user/entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';

export async function seedUsers(
  userRepository: Repository<User>,
  roles: Role[],
  permissions: Permission[],
  count = 5,
) {
  const adminRole = roles.find(r => r.name === 'admin');
  const userRole = roles.find(r => r.name === 'user');

  if (!adminRole || !userRole) {
    throw new Error('Roles admin/user no encontrados en BD');
  }

  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    const isAdmin = i === 0;

    users.push(
      userRepository.create({
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: '123456',
        roles: [isAdmin ? adminRole : userRole],
        permissions: isAdmin ? permissions : [],
      }),
    );
  }

  await userRepository.save(users);
  console.log(`✅ ${count} usuarios creados.`);
  return users;
}
