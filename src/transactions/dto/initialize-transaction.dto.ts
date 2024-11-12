import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO для передачі параметра amount при створенні нової транзакції.
 */
export class InitializeTransactionDto {
  @ApiProperty({ description: 'Сума транзакції', example: 1000 })
  amount: number;
}