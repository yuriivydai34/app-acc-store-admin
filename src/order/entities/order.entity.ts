import { CashReceipt } from '../../cash-receipt/entities/cash-receipt.entity';
import { Product } from '../../product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;

  @ManyToOne(() => CashReceipt, (cashReceipt) => cashReceipt.orders)
  cashReceipt: CashReceipt;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
