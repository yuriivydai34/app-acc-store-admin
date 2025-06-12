import { Test, TestingModule } from '@nestjs/testing';
import { CashReceiptController } from './cash-receipt.controller';
import { CashReceiptService } from './cash-receipt.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CashReceipt } from './entities/cash-receipt.entity';
import { Order } from '../order/entities/order.entity';

describe('CashReceiptController', () => {
  let controller: CashReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashReceiptController],
      providers: [
        CashReceiptService,
        {
          provide: getRepositoryToken(CashReceipt),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Order),
          useValue: {
            findByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CashReceiptController>(CashReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
