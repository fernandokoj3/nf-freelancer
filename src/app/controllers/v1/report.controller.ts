import { HttpStatusCode } from '@/domain/verbs';
import {
  RevenueByCustomerRequest,
  RevenueByMonthRequest,
  TotalRevenueRequest,
} from '@/dto/request/report.request';
import { authorizer } from '@/middlewares/authorizer.validator';
import {
  getBodyValidator,
  getQueryValidator,
} from '@/middlewares/handler.validation';
import { ReportService } from '@/services/v1/report.service';
import { Controller, Post } from '@/utils/inject.utils';
import { Request, Response } from 'express';

@Controller('/reports', authorizer)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/total-revenue', getBodyValidator(TotalRevenueRequest))
  public async totalRevenue(request: Request, response: Response) {
    const reportRequest = request.body as TotalRevenueRequest;
    const result = await this.reportService.getTotalRevenue(reportRequest);
    return response.status(HttpStatusCode.OK).send(result);
  }

  @Post(
    '/revenue-by-month',
    getBodyValidator(TotalRevenueRequest),
    getQueryValidator(RevenueByMonthRequest),
  )
  public async revenueByMonth(request: Request, response: Response) {
    const { fiscalYear } = request.body as TotalRevenueRequest;
    const byMonthRequest = request.query as unknown as RevenueByMonthRequest;
    const result = await this.reportService.getRevenueByMonth(
      fiscalYear,
      byMonthRequest,
    );
    return response.status(HttpStatusCode.OK).send(result);
  }

  @Post(
    '/revenue-by-customer',
    getBodyValidator(TotalRevenueRequest),
    getQueryValidator(RevenueByCustomerRequest),
  )
  public async revenueByCustomer(request: Request, response: Response) {
    const { fiscalYear } = request.body as TotalRevenueRequest;
    const reportRequest = request.query as unknown as RevenueByCustomerRequest;
    const result = await this.reportService.getRevenueByCustomer(
      fiscalYear,
      reportRequest,
    );
    return response.status(HttpStatusCode.OK).send(result);
  }
}
