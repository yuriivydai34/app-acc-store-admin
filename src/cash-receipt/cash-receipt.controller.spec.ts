import { Test, TestingModule } from '@nestjs/testing';
import { CashReceiptController } from './cash-receipt.controller';
import { CashReceiptService } from './cash-receipt.service';

describe('CashReceiptController', () => {
  let controller: CashReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashReceiptController],
      providers: [CashReceiptService],
    }).compile();

    controller = module.get<CashReceiptController>(CashReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
