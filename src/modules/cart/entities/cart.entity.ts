import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
    user: User;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    totalAmount: number;

    @Column({ default: true })
    isActive: boolean;
}
