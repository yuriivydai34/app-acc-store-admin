import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashReceiptService } from './cash-receipt.service';
import { CashReceiptController } from './cash-receipt.controller';
import { CashReceipt } from './entities/cash-receipt.entity';
import { Order } from '../order/entities/order.entity';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CashReceipt, Order]),
    OrderModule,
  ],
  controllers: [CashReceiptController],
  providers: [CashReceiptService],
  exports: [CashReceiptService],
})
export class CashReceiptModule {}
