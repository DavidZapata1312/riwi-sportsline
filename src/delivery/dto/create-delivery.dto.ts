// src/delivery/dto/create-delivery.dto.ts
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsPositive,
    IsArray,
    IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DeliveryStatus } from '../deliveries.enum';

export class CreateDeliveryDTO {
    @IsInt()
    @IsNotEmpty()
    clientId: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    totalAmount: number;

    @IsOptional()
    notes?: string;

    @IsOptional()
    @IsEnum(DeliveryStatus)
    status?: DeliveryStatus;

    @IsOptional()
    @IsInt()
    userId?: number;

    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number)
    productIds: number[];
}
