import { IsString, IsOptional, IsNumber, IsInt, IsPositive, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    price: number;

    @IsString()
    category: string;

    @IsInt()
    @Min(0)
    stock: number;
}
