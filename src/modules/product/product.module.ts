import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/category.repository';

@Module({
    controllers: [ProductController],
    providers: [
        ProductService,
        ProductRepository,
        CategoryService,
        CategoryRepository,
    ],
    exports: [ProductService, CategoryService],
})
export class ProductModule {}
