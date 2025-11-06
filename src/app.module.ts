import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeliveryModule } from './delivery/delivery.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { AppSourceData } from './config/db';

@Module({
    imports: [
        // Carga de variables de entorno
        ConfigModule.forRoot({
            isGlobal: true, // disponible en todos los módulos
        }),

        // Conexión a la base de datos
        TypeOrmModule.forRoot(AppSourceData),

        // Módulos de la aplicación
        UserModule,
        ClientModule,
        ProductModule,
        DeliveryModule,
    ],
})
export class AppModule {}
