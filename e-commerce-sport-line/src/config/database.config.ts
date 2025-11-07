import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (configServie: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configServie.get<string>('DB_HOST'),
  port: parseInt(configServie.get<string>('DB_PORT', '5432'), 10),
  username: configServie.get<string>('DB_USERNAME'),
  password: configServie.get<string>('DB_PASSWORD'),
  database: configServie.get<string>('DB_DATABASE'),
  autoLoadEntities: true,
  // synchronize: configServie.get<string>('NODE_ENV') !== 'production',
  logging: configServie.get<string>('NODE_ENV') !== 'production',
});
