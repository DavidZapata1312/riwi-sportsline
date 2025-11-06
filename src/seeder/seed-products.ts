import { Product } from "../product/entities/product.entity";
import { DataSource } from 'typeorm';

export async function seedProducts(dataSource: DataSource) {
    const productRepo = dataSource.getRepository(Product);

    const productsData = [
        { name: 'Cajas', price: 10, category: 'Embalaje', stock: 100 },
        { name: 'Botellas', price: 5, category: 'Contenedores', stock: 200 },
        { name: 'Palets', price: 20, category: 'Transporte', stock: 50 },
    ];

    const products = productRepo.create(productsData);
    await productRepo.save(products);

    console.log('✅ Products seeded');
    return products;
}
