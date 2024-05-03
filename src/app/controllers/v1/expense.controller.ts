import { HttpStatusCode } from '@/domain/verbs';
import {
  ExpenseCategoryOneRequest,
  ExpenseOneRequest,
  ExpensePersist,
} from '@/dto/request/expensive.request';
import { authorizer } from '@/middlewares/authorizer.validator';
import {
  getBodyValidator,
  getUrlParamValidator,
} from '@/middlewares/handler.validation';
import { ExpenseService } from '@/services/v1/expense.service';
import { Controller, Delete, Get, Post, Put } from '@/utils/inject.utils';
import { Request, Response } from 'express';

@Controller('/expenses', authorizer)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post(
    '/:category_id',
    getUrlParamValidator(ExpenseCategoryOneRequest),
    getBodyValidator(ExpensePersist),
  )
  public async create(request: Request, response: Response) {
    const { categoryId } =
      request.params as unknown as ExpenseCategoryOneRequest;
    const expensePersist = request.body as unknown as ExpensePersist;
    const id = await this.expenseService.create(categoryId, expensePersist);
    return response.status(HttpStatusCode.OK).send({ expense_id: id });
  }

  @Put(
    '/:expense_id',
    getUrlParamValidator(ExpenseOneRequest),
    getBodyValidator(ExpensePersist),
  )
  public async update(request: Request, response: Response) {
    const { id } = request.params as unknown as ExpenseOneRequest;
    const expensePersist = request.body as unknown as ExpensePersist;
    await this.expenseService.update(id, expensePersist);
    return response.status(HttpStatusCode.OK).send();
  }

  @Delete('/:expense_id', getUrlParamValidator(ExpenseOneRequest))
  public async remove(request: Request, response: Response) {
    const { id } = request.params as unknown as ExpenseOneRequest;
    await this.expenseService.remove(id);
    return response.status(HttpStatusCode.OK).send();
  }
}
