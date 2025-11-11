import {Delivery} from '../delivery/entities/delivery.entity';
import {DataSource} from 'typeorm';
import {User} from '../user/entities/user.entity';
import {Client} from '../client/entities/client.entity';
import {Product} from '../product/entities/product.entity';
import {DeliveryStatus} from '../delivery/deliveries.enum';

export async function seedDeliveries(
    dataSource: DataSource,
    users: User[],
    clients: Client[],
    products: Product[],
) {
    const deliveryRepo = dataSource.getRepository(Delivery);

    const deliveriesData = [
        {
            status: DeliveryStatus.PENDING,
            user: users[0],
            client: clients[0],
            products: [products[0], products[1]],
        },
        {
            status: DeliveryStatus.CANCELLED,
            user: users[1],
            client: clients[1],
            products: [products[2]],
        },
        {
            status: DeliveryStatus.DELIVERED,
            user: users[2],
            client: clients[2],
            products: [products[0], products[2]],
        },
    ];

    const deliveries = deliveryRepo.create(deliveriesData);
    await deliveryRepo.save(deliveries);

    console.log('✅ Deliveries seeded');
}
