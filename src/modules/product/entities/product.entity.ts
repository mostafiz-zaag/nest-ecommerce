import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { ProductVariant } from './product.variant.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title', type: 'varchar' })
    title: string;

    @Column({ name: 'slug', unique: true, type: 'varchar' })
    slug: string;

    @Column({ type: 'text', name: 'description' })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int')
    stock: number;

    // Many products belong to one category
    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: 'SET NULL', // Optional: if category is deleted, products remain with null category
        eager: true, // Automatically load category when querying products
    })
    category: Category;

    // One product has many variants
    @OneToMany(() => ProductVariant, (variant) => variant.product, {
        cascade: true, // Automatically handle variants during product operations
        eager: true, // Automatically load variants when querying products
    })
    variants: ProductVariant[];
}
