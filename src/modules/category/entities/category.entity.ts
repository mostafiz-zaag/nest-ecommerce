import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false, type: 'varchar' })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
