import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCashReceiptDto } from './dto/create-cash-receipt.dto';
import { UpdateCashReceiptDto } from './dto/update-cash-receipt.dto';
import { CashReceipt } from './entities/cash-receipt.entity';
import { Order } from '../order/entities/order.entity';
import { In } from 'typeorm';

@Injectable()
export class CashReceiptService {
  constructor(
    @InjectRepository(CashReceipt)
    private cashReceiptRepository: Repository<CashReceipt>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createCashReceiptDto: CreateCashReceiptDto): Promise<CashReceipt> {
    const cashReceipt = this.cashReceiptRepository.create();
    
    if (createCashReceiptDto.orders) {
      const orders = await this.orderRepository.find({
        where: { id: In(createCashReceiptDto.orders) },
        relations: ['product'],
      });
      cashReceipt.orders = orders;
      cashReceipt.totalAmount = orders.reduce((acc, order) => {
        if (!order.product) {
          throw new NotFoundException(`Product not found for order ${order.id}`);
        }
        return acc + order.product.price;
      }, 0);
    }

    return this.cashReceiptRepository.save(cashReceipt);
  }

  findAll(): Promise<CashReceipt[]> {
    return this.cashReceiptRepository.find({
      relations: ['orders', 'orders.product'],
    });
  }

  async findOne(id: number): Promise<CashReceipt> {
    const cashReceipt = await this.cashReceiptRepository.findOne({
      where: { id },
      relations: ['orders', 'orders.product'],
    });

    if (!cashReceipt) {
      throw new NotFoundException(`CashReceipt with ID ${id} not found`);
    }

    return cashReceipt;
  }

  async update(id: number, updateCashReceiptDto: UpdateCashReceiptDto): Promise<void> {
    const cashReceipt = await this.cashReceiptRepository.findOne({
      where: { id },
      relations: ['orders', 'orders.product'],
    });

    if (!cashReceipt) {
      throw new NotFoundException(`CashReceipt with ID ${id} not found`);
    }

    if (updateCashReceiptDto.orders) {
      const orders = await this.orderRepository.find({
        where: { id: In(updateCashReceiptDto.orders) },
        relations: ['product'],
      });
      cashReceipt.orders = orders;
      cashReceipt.totalAmount = orders.reduce((acc, order) => {
        if (!order.product) {
          throw new NotFoundException(`Product not found for order ${order.id}`);
        }
        return acc + order.product.price;
      }, 0);
    }

    await this.cashReceiptRepository.save(cashReceipt);
  }

  async remove(id: number): Promise<void> {
    const result = await this.cashReceiptRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CashReceipt with ID ${id} not found`);
    }
  }
}
