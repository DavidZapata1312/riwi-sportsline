import { User } from '../user/entities/user.entity'
import { DataSource } from 'typeorm';

export async function seedUsers(dataSource: DataSource) {
    const userRepo = dataSource.getRepository(User);

    const usersData = [
        { name: 'Alice Admin', email: 'alice@example.com', password: 'admin123' },
        { name: 'Bob Manager', email: 'bob@example.com', password: 'manager123' },
        { name: 'Charlie Driver', email: 'charlie@example.com', password: 'driver123' },
    ];

    const users = userRepo.create(usersData);
    await userRepo.save(users);

    console.log(' Users seeded');
    return users;
}
