import 'reflect-metadata';
import { plainToClass, Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PAGINATION } from '@/utils/constants';
import { Class } from 'utility-types';

export interface Sortable {
  order: string;
  sort: string;
}

export interface PageableOptions {
  page: number;
  limit: number;
  sort: string;
  order: string;
}

export interface PageableRequest<Entity> extends PageableOptions {
  entity: Entity;
}

export abstract class PageBaseRequest {
  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  @IsInt()
  @Max(100)
  @Min(10)
  limit: number = PAGINATION.MAX_LIMIT_SIZE;

  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = PAGINATION.MIN_PAGE_SIZE;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  sort = 'ASC';

  constructor() {
    this.page =
      this.page === PAGINATION.MIN_PAGE_SIZE
        ? PAGINATION.MIN_START_PAGE
        : this.page;
  }

  public static get<T extends PageBaseRequest & Sortable, Entity>(
    value: T,
    clazz: Class<Entity>,
  ) {
    const entity = plainToClass(clazz, value, {
      excludePrefixes: ['limit', 'page', 'sort', 'order'],
    });
    const page =
      value.page === PAGINATION.MIN_START_PAGE
        ? PAGINATION.MIN_PAGE_SIZE
        : value.page;
    const limit = value.limit;
    const sort = value.sort;
    const order = value.order;
    return { page, limit, sort, order, entity } as PageableRequest<Entity>;
  }
}
