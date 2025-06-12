import { ApiProperty } from "@nestjs/swagger";

export class CreateCashReceiptDto {
  @ApiProperty()
  orders: number[];
}
