import { Body, Controller, Param, Post, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';
import { AddPaymentDto } from './dto/add-payment.dto';

/**
 * Контролер для обробки запитів, пов'язаних із транзакціями.
 */
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // Ендпоінт для створення нової транзакції
  @Post('initialize')
  async initializeTransaction(@Body() initializeTransactionDto: InitializeTransactionDto) {
    return this.transactionsService.initializeTransaction(initializeTransactionDto.amount);
  }

  // Ендпоінт для додавання платежу до існуючої транзакції
  @Post(':id/payment')
  async addPayment(
    @Param('id') id: string,
    @Body() addPaymentDto: AddPaymentDto,
  ) {
    try {
      return await this.transactionsService.addPayment(id, addPaymentDto.amount);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Ендпоінт для отримання статусу транзакції
  @Post(':id/status')
  async getTransactionStatus(@Param('id') id: string) {
    const transaction = await this.transactionsService.getTransactionById(id);
    if (!transaction) throw new NotFoundException('Транзакція не знайдена');
    return { isComplete: transaction.isComplete };
  }
}
