import { Expose } from 'class-transformer';
import { Sortable } from './base/page.base.request';
import { IsDefined, IsEnum, IsNumber, Max, Min } from 'class-validator';
import { IsValidYear } from '@/middlewares/custom.validation';

export enum RevenueByMonthOrder {
  MONTH_NAME = 'month_name',
  MONTH_REVENUE = 'month_revenue',
}

export enum RevenueByCustomerOrder {
  CUSTOMER_NAME = 'customer_name',
  REVENUE = 'revenue',
}

export class TotalRevenueRequest {
  @Expose({ name: 'fiscal_year' })
  @IsDefined()
  @IsNumber()
  @Max(9999)
  @IsValidYear()
  fiscalYear: number;
}

export class RevenueByMonthRequest implements Sortable {
  @IsEnum(RevenueByMonthOrder, {
    message: ({ value, property }) => {
      return `${property} '${value}' is not a valid order on ${Object.values(
        RevenueByMonthOrder,
      ).join('|')}`;
    },
  })
  order: string = RevenueByMonthOrder.MONTH_NAME;

  sort: 'ASC' | 'DESC';
}

export class RevenueByCustomerRequest implements Sortable {
  @IsEnum(RevenueByCustomerOrder, {
    message: ({ value, property }) => {
      return `${property} '${value}' is not a valid order on ${Object.values(
        RevenueByCustomerOrder,
      ).join('|')}`;
    },
  })
  order: string = RevenueByCustomerOrder.CUSTOMER_NAME;

  sort: 'ASC' | 'DESC';
}
