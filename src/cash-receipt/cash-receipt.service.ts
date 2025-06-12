import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCashReceiptDto } from './dto/create-cash-receipt.dto';
import { UpdateCashReceiptDto } from './dto/update-cash-receipt.dto';
import { CashReceipt } from './entities/cash-receipt.entity';
import { Order } from '../order/entities/order.entity';

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
      const orders = await this.orderRepository.findByIds(createCashReceiptDto.orders);
      cashReceipt.orders = orders;
    }

    return this.cashReceiptRepository.save(cashReceipt);
  }

  findAll(): Promise<CashReceipt[]> {
    return this.cashReceiptRepository.find({
      relations: ['orders'],
    });
  }

  async findOne(id: number): Promise<CashReceipt> {
    const cashReceipt = await this.cashReceiptRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!cashReceipt) {
      throw new NotFoundException(`CashReceipt with ID ${id} not found`);
    }

    return cashReceipt;
  }

  async update(id: number, updateCashReceiptDto: UpdateCashReceiptDto): Promise<void> {
    const cashReceipt = await this.cashReceiptRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!cashReceipt) {
      throw new NotFoundException(`CashReceipt with ID ${id} not found`);
    }

    if (updateCashReceiptDto.orders) {
      const orders = await this.orderRepository.findByIds(updateCashReceiptDto.orders);
      cashReceipt.orders = orders;
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
