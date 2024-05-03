import { Expose, Transform, Type } from 'class-transformer';

export class TotalRevenueResponse {
  @Expose({ name: 'total_revenue' })
  @Transform(({ value }) => value || 0)
  total_revenue: number;

  @Expose({ name: 'max_revenue_amount' })
  @Transform(({ value }) => value || 0)
  max_revenue_amount: number;
}

export class RevenueByMonthListResponse {
  @Expose({ name: 'month_name' })
  month_name: string;

  @Expose({ name: 'month_revenue' })
  @Transform(({ value }) => value || 0)
  month_revenue: number;
}

export class RevenueByMonthResponse {
  @Expose({ name: 'max_revenue_amount' })
  max_revenue_amount: number;

  @Type(() => RevenueByMonthListResponse)
  revenues: RevenueByMonthListResponse[];
}

export class RevenueByCustomerListResponse {
  @Expose({ name: 'customer_name' })
  customer_name: string;

  @Expose({ name: 'revenue' })
  @Transform(({ value }) => value || 0)
  revenue: number;
}

export class RevenueByCustomerResponse {
  @Expose({ name: 'max_revenue_amount' })
  max_revenue_amount: number;

  @Type(() => RevenueByCustomerListResponse)
  revenues: RevenueByCustomerListResponse[];
}
