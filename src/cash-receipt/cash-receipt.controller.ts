import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashReceiptService } from './cash-receipt.service';
import { CreateCashReceiptDto } from './dto/create-cash-receipt.dto';
import { UpdateCashReceiptDto } from './dto/update-cash-receipt.dto';

@Controller('cash-receipt')
export class CashReceiptController {
  constructor(private readonly cashReceiptService: CashReceiptService) {}

  @Post()
  create(@Body() createCashReceiptDto: CreateCashReceiptDto) {
    return this.cashReceiptService.create(createCashReceiptDto);
  }

  @Get()
  findAll() {
    return this.cashReceiptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashReceiptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashReceiptDto: UpdateCashReceiptDto) {
    return this.cashReceiptService.update(+id, updateCashReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashReceiptService.remove(+id);
  }
}
