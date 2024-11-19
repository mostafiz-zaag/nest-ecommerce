import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class ProductVariantDto {
    @IsNotEmpty({ message: 'Size is required' })
    @IsString({ message: 'Size must be a string' })
    @MinLength(1, { message: 'Size must be at least 1 character' })
    @MaxLength(10, { message: 'Size must not exceed 10 characters' })
    size: string;

    @IsNotEmpty({ message: 'SKU is required' })
    @IsString({ message: 'SKU must be a string' })
    @MinLength(1, { message: 'SKU must be at least 1 character' })
    @MaxLength(20, { message: 'SKU must not exceed 20 characters' })
    sku: string;

    @IsNotEmpty({ message: 'Additional price is required' })
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'Additional price must be a decimal with up to 2 digits' },
    )
    @Min(0, { message: 'Additional price must be at least 0' })
    additionalPrice: number;
}
