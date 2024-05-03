import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class ExpenseCategoryOneRequest {
  @Expose({ name: 'category_id' })
  @Type(() => Number)
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  categoryId: number;
}

export class ExpenseOneRequest {
  @Expose({ name: 'expense_id' })
  @Type(() => Number)
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  id: number;
}

export class ExpensePersist {
  @IsDefined()
  @IsNumber()
  amount: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  description: string;

  @Type(() => Date)
  @IsDefined()
  @IsDate()
  @Expose({ name: 'accrual_date' })
  accrualDate: Date;

  @Type(() => Date)
  @IsDefined()
  @IsDate()
  @Expose({ name: 'transaction_date' })
  transactionDate: Date;

  @IsDefined()
  @IsNumber()
  @Expose({ name: 'customer_id' })
  customerId: number;
}
