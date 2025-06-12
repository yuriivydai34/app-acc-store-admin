import { Order } from '../../order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class CashReceipt {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Order, (order) => order.cashReceipt)
  orders: Order[];

  @Column()
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
