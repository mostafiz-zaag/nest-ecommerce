import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('/create')
    async create(
        @Body() createProductDto: CreateProductDto,
    ): Promise<{ data: Product; message: string }> {
        const product = await this.productService.create(createProductDto);

        return {
            message: 'Product created successful.',
            data: product,
        };
    }

    @Get()
    async read(): Promise<{ data: Product[]; message: string }> {
        return {
            message: 'Product fetched successful',
            data: await this.productService.read(),
        };
    }
}
