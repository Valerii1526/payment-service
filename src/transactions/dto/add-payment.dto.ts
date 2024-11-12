import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для передачі параметра amount при додаванні платежу до транзакції.
 */
export class AddPaymentDto {
  @ApiProperty({ description: 'Сума платежу', example: 100 })
  amount: number;
}