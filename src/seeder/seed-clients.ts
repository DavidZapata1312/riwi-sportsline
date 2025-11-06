import { Client } from '../client/entities/client.entity'
import { DataSource } from 'typeorm';

export async function seedClients(dataSource: DataSource) {
    const clientRepo = dataSource.getRepository(Client);

    const clientsData = [
        { name: 'Empresa Alfa', email: 'alfa@empresa.com' },
        { name: 'Beta Corp', email: 'contacto@beta.com' },
        { name: 'Gamma S.A.', email: 'ventas@gamma.com' },
    ];

    const clients = clientRepo.create(clientsData);
    await clientRepo.save(clients);

    console.log('✅ Clients seeded');
    return clients;
}
