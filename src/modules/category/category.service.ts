import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create.category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const { name } = createCategoryDto;
        const isExists = await this.categoryRepository.findOne({
            where: { name },
        });

        if (isExists) {
            throw new ConflictException('Category already exists');
        }

        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async read(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }
}
