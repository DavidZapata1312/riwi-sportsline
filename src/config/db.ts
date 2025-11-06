import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
config();

export const AppSourceData: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // ❗Solo para desarrollo
    logging: true,
};

const dataSource = new DataSource(AppSourceData);
export default dataSource;
