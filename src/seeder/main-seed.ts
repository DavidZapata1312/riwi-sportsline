import  dataSource  from '../config/db';
import { seedUsers } from './seed-users';
import { seedClients } from './seed-clients';
import { seedProducts } from './seed-products';
import { seedDeliveries } from './seed-deliveries';

async function runSeeds() {
    await dataSource.initialize();
    console.log(' Database connected');

    console.log('Dropping database schema...');
    await dataSource.dropDatabase();
    await dataSource.synchronize();

    const users = await seedUsers(dataSource);
    const clients = await seedClients(dataSource);
    const products = await seedProducts(dataSource);

    await seedDeliveries(dataSource, users, clients, products);

    await dataSource.destroy();
    console.log('Seeding completed successfully!');
}

runSeeds().catch((error) => {
    console.error(' Error during seeding:', error);
    process.exit(1);
});
