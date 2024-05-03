import { HttpStatusCode } from '@/domain/verbs';
import {
  CustomerMerge,
  CustomerOneRequest,
  CustomerPersist,
  CustomerRequest,
} from '@/dto/request/customer.request';
import { authorizer } from '@/middlewares/authorizer.validator';
import {
  getBodyValidator,
  getQueryValidator,
  getUrlParamValidator,
} from '@/middlewares/handler.validation';
import { CustomerService } from '@/services/v1/customer.service';
import { Controller, Get, Patch, Post, Put } from '@/utils/inject.utils';
import { Request, Response } from 'express';

@Controller('/customers', authorizer)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('', getQueryValidator(CustomerRequest))
  public async list(request: Request, response: Response) {
    const customerRequest = request.query as unknown as CustomerRequest;
    const result = await this.customerService.list(customerRequest);
    return response.status(HttpStatusCode.OK).send(result);
  }

  @Get('/:id', getUrlParamValidator(CustomerOneRequest))
  public async one(request: Request, response: Response) {
    const { id } = request.params as unknown as CustomerOneRequest;
    const result = await this.customerService.one(id);
    return response.status(HttpStatusCode.OK).send(result);
  }

  @Post('', getBodyValidator(CustomerPersist))
  public async create(request: Request, response: Response) {
    const customerPersist = request.body as unknown as CustomerPersist;
    const id = await this.customerService.create(customerPersist);
    return response.status(HttpStatusCode.OK).send({ customer_id: id });
  }

  @Put('/:id/archives', getUrlParamValidator(CustomerOneRequest))
  public async archive(request: Request, response: Response) {
    const { id } = request.params as unknown as CustomerOneRequest;
    await this.customerService.archive(id);
    return response.status(HttpStatusCode.OK).send();
  }

  @Put(
    '/:id',
    getUrlParamValidator(CustomerOneRequest),
    getBodyValidator(CustomerPersist),
  )
  public async update(request: Request, response: Response) {
    const { id } = request.params as unknown as CustomerOneRequest;
    const customerPersist = request.body as unknown as CustomerPersist;
    await this.customerService.update(id, customerPersist);
    return response.status(HttpStatusCode.OK).send();
  }

  @Patch(
    '/:id',
    getUrlParamValidator(CustomerOneRequest),
    getBodyValidator(CustomerMerge),
  )
  public async merge(request: Request, response: Response) {
    const { id } = request.params as unknown as CustomerOneRequest;
    const customerMerge = request.body as unknown as CustomerMerge;
    await this.customerService.merge(id, customerMerge);
    return response.status(HttpStatusCode.OK).send();
  }
}
