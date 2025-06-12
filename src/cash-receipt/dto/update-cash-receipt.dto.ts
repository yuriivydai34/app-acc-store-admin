import { PartialType } from '@nestjs/swagger';
import { CreateCashReceiptDto } from './create-cash-receipt.dto';

export class UpdateCashReceiptDto extends PartialType(CreateCashReceiptDto) {}
