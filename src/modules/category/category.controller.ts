import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post('/create')
    async create(
        @Body() createCategoryDto: CreateCategoryDto,
    ): Promise<{ data: Category; message: string }> {
        const category = await this.categoryService.create(createCategoryDto);
        return {
            message: 'Category create successful.',
            data: category,
        };
    }

    @Get()
    async read(): Promise<{ data: Category[]; message: string }> {
        return {
            message: 'Category fetched successful',
            data: await this.categoryService.read(),
        };
    }
}
