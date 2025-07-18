import { Test, TestingModule } from '@nestjs/testing';
import { CashReceiptService } from './cash-receipt.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CashReceipt } from './entities/cash-receipt.entity';
import { Order } from '../order/entities/order.entity';

describe('CashReceiptService', () => {
  let service: CashReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CashReceiptService>(CashReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
