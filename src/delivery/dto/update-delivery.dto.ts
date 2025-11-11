import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryDTO } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDTO) {}
