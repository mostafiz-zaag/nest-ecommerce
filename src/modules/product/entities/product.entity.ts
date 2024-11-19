import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { ProductVariant } from './product.variant.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column({ type: 'text' })
    description: string;

    @Column('decimal')
    price: number;

    @Column('int')
    stock: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @OneToMany(() => ProductVariant, (variant) => variant.product, {
        cascade: true,
    })
    variants: ProductVariant[];
}
