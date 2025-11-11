import { PartialType } from '@nestjs/swagger';
import { CreateClientDTO } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDTO) {}
