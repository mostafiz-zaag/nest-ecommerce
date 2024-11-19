import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create.product.dto';
import { Product } from './entities/product.entity';
import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const { categoryId, variants, slug } = createProductDto;

        const isExist = await this.productRepository.findOne({
            where: { slug: slug },
        });

        if (isExist) {
            throw new ConflictException('Slug already exists');
        }

        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const product = this.productRepository.create({
            ...createProductDto,
            category,
            variants: variants || [],
        });

        const savedProduct = await this.productRepository.save(product);

        return this.productRepository.findOne({
            where: { id: savedProduct.id },
            relations: ['category', 'variants'],
        });
    }

    async read(): Promise<Product[]> {
        return await this.productRepository.find({
            relations: ['category', 'variants'],
        });
    }
}
