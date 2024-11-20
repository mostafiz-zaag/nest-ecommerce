import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Request } from 'express';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('/add-to-cart')
    async addToCart(
        @Req() req: Request,
        @Body()
        { productId, quantity }: { productId: number; quantity: number },
    ) {
        const userId = req.user.userId;
        await this.cartService.addToCart(userId, productId, quantity);

        return {
            message: 'Product added successfully.',
        };
    }

    @Get()
    async getUserCart(@Req() req: Request) {
        const userId = req.user?.userId;
        const cart = await this.cartService.getUserCart(userId);

        return {
            message: 'Cart fetched successfully',
            data: cart,
        };
    }
}
