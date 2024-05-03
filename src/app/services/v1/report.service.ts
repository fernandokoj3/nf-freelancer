import {
  RevenueByCustomerRequest,
  RevenueByMonthRequest,
  TotalRevenueRequest,
} from '@/dto/request/report.request';
import {
  RevenueByCustomerResponse,
  RevenueByMonthResponse,
  TotalRevenueResponse,
} from '@/dto/response/report.response';
import { RevenueRepository } from '@/repository/revenue.repository';
import { plainToInstance } from 'class-transformer';
import { Service } from 'typedi';

@Service()
export class ReportService {
  constructor(private readonly revenueRepository: RevenueRepository) {}

  public async getTotalRevenue(
    request: TotalRevenueRequest,
  ): Promise<TotalRevenueResponse> {
    const result = await this.revenueRepository.getTotalRevenue(
      request.fiscalYear,
    );
    return plainToInstance(TotalRevenueResponse, result);
  }

  public async getRevenueByMonth(
    year: number,
    request: RevenueByMonthRequest,
  ): Promise<RevenueByMonthResponse> {
    const result = await this.revenueRepository.getRevenueByMonth(
      year,
      request,
    );
    return plainToInstance(RevenueByMonthResponse, result);
  }

  public async getRevenueByCustomer(
    year: number,
    request: RevenueByCustomerRequest,
  ): Promise<RevenueByCustomerResponse> {
    const result = await this.revenueRepository.getRevenueByCustomer(
      year,
      request,
    );
    return plainToInstance(RevenueByCustomerResponse, result);
  }
}
