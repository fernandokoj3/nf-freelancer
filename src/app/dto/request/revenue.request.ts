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

import { Expose, Type } from 'class-transformer';

export class RevenuePersist {
  @IsDefined()
  @IsNumber()
  amount: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'invoice_id' })
  invoiceId: string;

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
}

export class RevenueOneRequest {
  @Expose({ name: 'customer_id' })
  @Type(() => Number)
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  customerId: number;
}

export class RevenueUpdateRequest {
  @Type(() => Number)
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  id: number;
}
