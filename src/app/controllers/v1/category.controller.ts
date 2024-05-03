import { HttpStatusCode } from '@/domain/verbs';
import {
  CategoryOneRequest,
  CategoryPersist,
  CategoryRequest,
} from '@/dto/request/category.request';
import { authorizer } from '@/middlewares/authorizer.validator';
import {
  getBodyValidator,
  getQueryValidator,
  getUrlParamValidator,
} from '@/middlewares/handler.validation';
import { CategoryService } from '@/services/v1/category.service';
import { Controller, Get, Post, Put } from '@/utils/inject.utils';
import { Request, Response } from 'express';

@Controller('/categories', authorizer)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('', getBodyValidator(CategoryPersist))
  public async create(request: Request, response: Response) {
    const categoryPersist = request.body as unknown as CategoryPersist;
    const id = await this.categoryService.create(categoryPersist);
    return response.status(HttpStatusCode.OK).send({ category_id: id });
  }

  @Get('/:id', getUrlParamValidator(CategoryOneRequest))
  public async one(request: Request, response: Response) {
    const { id } = request.params as unknown as CategoryOneRequest;
    const result = await this.categoryService.one(id);
    return response.status(HttpStatusCode.OK).send(result);
  }

  @Get('', getQueryValidator(CategoryRequest))
  public async list(request: Request, response: Response) {
    const categoryRequest = request.query as unknown as CategoryRequest;
    const result = await this.categoryService.list(categoryRequest);
    return response.status(HttpStatusCode.OK).send(result);
  }

  @Put(
    '/:id',
    getUrlParamValidator(CategoryOneRequest),
    getBodyValidator(CategoryPersist),
  )
  public async update(request: Request, response: Response) {
    const { id } = request.params as unknown as CategoryOneRequest;
    const categoryPersist = request.body as unknown as CategoryPersist;
    await this.categoryService.update(id, categoryPersist);
    return response.status(HttpStatusCode.OK).send();
  }

  @Put('/:id/archives', getUrlParamValidator(CategoryOneRequest))
  public async archive(request: Request, response: Response) {
    const { id } = request.params as unknown as CategoryOneRequest;
    await this.categoryService.archive(id);
    return response.status(HttpStatusCode.OK).send();
  }
}
