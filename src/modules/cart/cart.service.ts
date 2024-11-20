import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { ProductRepository } from '../product/product.repository';
import { UserRepository } from '../user/user.repository';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly productRepository: ProductRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async addToCart(userId: number, productId: number, quantity: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // 3. Fetch or create the user's cart
        let cart = await this.cartRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });

        console.log('cart ', cart);

        if (!cart) {
            cart = this.cartRepository.create({
                user: user,
                cartDetails: [],
            });
        }

        const existingProductIndex = cart.cartDetails.findIndex(
            (item) => item.productId === productId,
        );

        if (existingProductIndex !== -1) {
            cart.cartDetails[existingProductIndex].quantity += quantity;
        } else {
            cart.cartDetails.push({
                productId: productId,
                quantity: quantity,
            });
        }

        return await this.cartRepository.save(cart);
    }

    async getUserCart(userId: number): Promise<Cart> {
        // Fetch the user's cart
        const cart = await this.cartRepository.findOne({
            where: { user: { id: userId } },
            // relations: ['user'], // Load the user relation
        });

        if (!cart) {
            throw new NotFoundException('Cart not found for this user');
        }

        // Populate product details from `cartDetails`
        return {
            ...cart,
            cartDetails: await Promise.all(
                cart.cartDetails.map(async (item) => {
                    const product = await this.productRepository.findOne({
                        where: { id: item.productId },
                    });

                    if (product) {
                        return {
                            productId: item.productId,
                            quantity: item.quantity,
                            productTitle: product.title,
                            price: product.price,
                            total: item.quantity * product.price,
                        };
                    }

                    return item; // In case the product is missing, fallback to the original item
                }),
            ),
        };
    }
}
