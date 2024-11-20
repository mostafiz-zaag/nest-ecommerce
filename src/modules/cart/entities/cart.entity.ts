import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE', eager: true })
    @JoinColumn()
    user: User;

    @Column('jsonb', { name: 'cart_details', default: [] })
    cartDetails: { productId: number; quantity: number }[];
}
