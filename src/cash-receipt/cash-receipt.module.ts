import { Module } from '@nestjs/common';
import { CashReceiptService } from './cash-receipt.service';
import { CashReceiptController } from './cash-receipt.controller';
import { CashReceipt } from './entities/cash-receipt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CashReceipt])],
  controllers: [CashReceiptController],
  providers: [CashReceiptService],
})
export class CashReceiptModule {}
