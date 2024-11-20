import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class AddToCartDto {
    @IsInt({ message: 'User ID must be an integer' })
    @IsPositive({ message: 'User ID must be a positive number' })
    @IsNotEmpty({ message: 'User ID is required' })
    userId: number;

    @IsInt({ message: 'Product ID must be an integer' })
    @IsPositive({ message: 'Product ID must be a positive number' })
    @IsNotEmpty({ message: 'Product ID is required' })
    productId: number;

    @IsInt({ message: 'Quantity must be an integer' })
    @IsPositive({ message: 'Quantity must be a positive number' })
    @IsNotEmpty({ message: 'Quantity is required' })
    quantity: number;
}
