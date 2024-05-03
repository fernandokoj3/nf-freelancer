import { Service } from 'typedi';
import { BaseRepository } from './base/base.repository';
import { Revenue } from '@/models/revenue';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import {
  RevenueByCustomerRequest,
  RevenueByMonthRequest,
} from '@/dto/request/report.request';

type TotalRevenue = {
  total_revenue: number;
  max_revenue_amount: number;
};

type TotalRevenueByMonth = {
  max_revenue_amount: number;
  reveneus: [{ month_name: string; month_revenue: number }];
};

type TotalRevenueByCustomer = {
  max_revenue_amount: number;
  reveneus: [{ customer_name: string; revenue: number }];
};

@Service()
export class RevenueRepository extends BaseRepository<Revenue> {
  constructor(@InjectRepository(Revenue) repository: Repository<Revenue>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  public async getTotalRevenue(year: number): Promise<TotalRevenue> {
    return await this.createQueryBuilder('rv')
      .select([
        'sum(rv.amount) as total_revenue',
        'max(rv.amount) as max_revenue_amount',
      ])
      .where("DATE_PART('year', rv.accrual_date) = :year", { year })
      .getRawOne();
  }

  public async getRevenueByMonth(
    year: number,
    request: RevenueByMonthRequest,
  ): Promise<TotalRevenueByMonth> {
    const reveneus = (await this.createQueryBuilder('rv')
      .select([
        "TRIM(to_char(rv.accrual_date, 'month')) as month_name",
        'sum(rv.amount) as month_revenue',
      ])
      .where("DATE_PART('year', rv.accrual_date) = :year", {
        year,
      })
      .groupBy('month_name')
      .orderBy(request.order, request.sort)
      .getRawMany()) as any[];

    const { max_revenue_amount } = (await this.createQueryBuilder('rv')
      .select('max(rv.amount) as max_revenue_amount')
      .where("DATE_PART('year', rv.accrual_date) = :year", {
        year,
      })
      .getRawOne()) as { max_revenue_amount: string };

    return {
      max_revenue_amount: parseFloat(max_revenue_amount),
      reveneus: reveneus.map(r => {
        return {
          month_name: r.month_name,
          month_revenue: parseFloat(r.month_revenue) as number,
        };
      }) as [{ month_name: string; month_revenue: number }],
    };
  }

  public async getRevenueByCustomer(
    year: number,
    request: RevenueByCustomerRequest,
  ): Promise<TotalRevenueByCustomer> {
    const customers = (await this.createQueryBuilder('rv')
      .select([
        'customer.commercial_name as customer_name',
        'sum(rv.amount) as revenue',
      ])
      .innerJoin('rv.customer', 'customer')
      .where("DATE_PART('year', rv.accrual_date) = :year", {
        year,
      })
      .groupBy('customer_name')
      .orderBy(request.order, request.sort)
      .getRawMany()) as any;

    const { max_revenue_amount } = (await this.createQueryBuilder('rv')
      .select('max(rv.amount) as max_revenue_amount')
      .where("DATE_PART('year', rv.accrual_date) = :year", {
        year,
      })
      .getRawOne()) as { max_revenue_amount: string };

    return {
      max_revenue_amount: parseFloat(max_revenue_amount),
      reveneus: customers.map(r => {
        return {
          customer_name: r.customer_name,
          revenue: parseFloat(r.revenue) as number,
        };
      }) as [{ customer_name: string; revenue: number }],
    };
  }
}
