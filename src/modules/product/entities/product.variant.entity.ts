import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_variants')
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'size', type: 'varchar' })
    size: string; // e.g., "M", "L"

    @Column({ name: 'sku', type: 'varchar' })
    sku: string; // Stock Keeping Unit (unique identifier for the variant)

    @Column('decimal', { precision: 10, scale: 2 })
    additionalPrice: number; // Additional cost for the variant

    @ManyToOne(() => Product, (product) => product.variants, {
        onDelete: 'CASCADE',
    })
    product: Product;
}
