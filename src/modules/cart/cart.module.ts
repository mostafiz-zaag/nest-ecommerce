import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { ProductRepository } from '../product/product.repository';
import { ProductService } from '../product/product.service';
import { CategoryRepository } from '../category/category.repository';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

@Module({
    imports: [AuthModule],
    controllers: [CartController],
    providers: [
        CartService,
        CartRepository,
        ProductService,
        ProductRepository,
        CategoryRepository,
        UserRepository,
        UserService,
    ],
    exports: [CartService, ProductService, UserService],
})
export class CartModule {}
