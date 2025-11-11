import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(
        @Inject(ProductService)
        private readonly ProductService: ProductService,
    ) {}

    @Post()
    CreateProduct(@Body() CreateProductDto: CreateProductDto) {
        return this.ProductService.create(CreateProductDto);
    }

    @Get()
    findAll() {
        return this.ProductService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ProductService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateProduct:UpdateProductDto) {
        return this.ProductService.update(+id, UpdateProduct);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ProductService.remove(+id);
    }
}
