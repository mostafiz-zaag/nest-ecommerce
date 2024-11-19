import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Min,
    IsInt,
    MinLength,
    MaxLength,
    IsArray,
    ValidateNested,
    IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductVariantDto } from './product.variant.dto';

export class CreateProductDto {
    @IsNotEmpty({ message: 'Product title is required' })
    @IsString({ message: 'Product title must be a string' })
    @MinLength(3, {
        message: 'Product title must be at least 3 characters long',
    })
    @MaxLength(50, { message: 'Product title must not exceed 50 characters' })
    title: string;

    @IsNotEmpty({ message: 'Product slug is required' })
    @IsString({ message: 'Product slug must be a string' })
    @MinLength(3, {
        message: 'Product slug must be at least 3 characters long',
    })
    @MaxLength(50, { message: 'Product slug must not exceed 50 characters' })
    slug: string;

    @IsNotEmpty({ message: 'Product description is required' })
    @IsString({ message: 'Product description must be a string' })
    @MinLength(10, {
        message: 'Product description must be at least 10 characters long',
    })
    @MaxLength(500, {
        message: 'Product description must not exceed 500 characters',
    })
    description: string;

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'Price must be a decimal with up to 2 digits' },
    )
    @Min(0.01, { message: 'Price must be at least 0.01' })
    price: number;

    @IsNotEmpty({ message: 'Stock is required' })
    @IsInt({ message: 'Stock must be an integer' })
    @Min(0, { message: 'Stock cannot be negative' })
    stock: number;

    @IsNotEmpty({ message: 'Category ID is required' })
    @IsInt({ message: 'Category ID must be an integer' })
    categoryId: number;

    @IsOptional()
    @IsArray({ message: 'Variants must be an array' })
    @ValidateNested({ each: true })
    @Type(() => ProductVariantDto)
    variants?: ProductVariantDto[];
}
