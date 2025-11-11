import { IsNumber, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  subtotal: number;
}
