import { Injectable } from '@nestjs/common';
import { CreateCashReceiptDto } from './dto/create-cash-receipt.dto';
import { UpdateCashReceiptDto } from './dto/update-cash-receipt.dto';
import { CashReceipt } from './entities/cash-receipt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CashReceiptService {
  constructor(
    @InjectRepository(CashReceipt)
    private cashReceiptRepository: Repository<CashReceipt>,
  ) {}

  create(createCashReceiptDto: CreateCashReceiptDto): Promise<CashReceipt> {
    return this.cashReceiptRepository.save(createCashReceiptDto);
  }

  findAll(): Promise<CashReceipt[]> {
    return this.cashReceiptRepository.find();
  }

  findOne(id: number): Promise<CashReceipt | null> {
    return this.cashReceiptRepository.findOne({ where: { id } });
  }

  update(id: number, updateCashReceiptDto: UpdateCashReceiptDto): Promise<UpdateResult> {
    return this.cashReceiptRepository.update(id, updateCashReceiptDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.cashReceiptRepository.delete(id);
  }
}
