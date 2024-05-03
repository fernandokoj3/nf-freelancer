import { HttpStatusCode } from '@/domain/verbs';
import {
  RevenueOneRequest,
  RevenuePersist,
  RevenueUpdateRequest,
} from '@/dto/request/revenue.request';
import { authorizer } from '@/middlewares/authorizer.validator';
import {
  getBodyValidator,
  getUrlParamValidator,
} from '@/middlewares/handler.validation';
import { RevenueService } from '@/services/v1/revenue.service';
import { Controller, Delete, Post, Put } from '@/utils/inject.utils';
import { Request, Response } from 'express';

@Controller('/revenues', authorizer)
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Post(
    '/:customer_id',
    getUrlParamValidator(RevenueOneRequest),
    getBodyValidator(RevenuePersist),
  )
  public async create(request: Request, response: Response) {
    const revenueRequest = request.body as RevenuePersist;
    const { customerId } = request.params as unknown as RevenueOneRequest;
    const revenue_id = await this.revenueService.create(
      customerId,
      revenueRequest,
    );
    return response.status(HttpStatusCode.OK).send({ revenue_id });
  }

  @Put(
    '/:id',
    getUrlParamValidator(RevenueUpdateRequest),
    getBodyValidator(RevenuePersist),
  )
  public async update(request: Request, response: Response) {
    const revenueRequest = request.body as RevenuePersist;
    const { id } = request.params as unknown as RevenueUpdateRequest;
    await this.revenueService.update(id, revenueRequest);
    return response.status(HttpStatusCode.OK).send();
  }

  @Delete('/:id', getUrlParamValidator(RevenueUpdateRequest))
  public async remove(request: Request, response: Response) {
    const { id } = request.params as unknown as RevenueUpdateRequest;
    await this.revenueService.remove(id);
    return response.status(HttpStatusCode.OK).send();
  }
}
