import { PageableRequest } from '@/dto/request/base/page.base.request';
import {
  FindManyOptions,
  FindOperator,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

type FilterOptions<T> = {
  [key: symbol]: FindOperator<T> | FindOptionsWhere<T>;
};

type RelationOptions = {
  [key: string | symbol]: any;
};

export class BaseRepository<T> extends Repository<T> {
  public async page(
    pageable?: PageableRequest<T>,
  ): Promise<{ result: T[]; total: number }>;

  public async page(
    pageable: PageableRequest<T>,
    relations?: RelationOptions,
  ): Promise<{ result: T[]; total: number }>;

  public async page(
    pageable: PageableRequest<T>,
    filters: FilterOptions<T>[],
  ): Promise<{ result: T[]; total: number }>;

  public async page(
    pageable: PageableRequest<T>,
    relations?: RelationOptions,
    filters?: FilterOptions<T>[],
  ) {
    const options: FindManyOptions = {
      ...(relations && relations),
      ...(pageable.order &&
        pageable.sort && {
          order: {
            [pageable.order]: {
              direction: pageable.sort,
            },
          },
        }),
      ...(pageable.page &&
        pageable.limit && { skip: (pageable.page - 1) * pageable.limit }),
      ...(pageable.limit && { take: pageable.limit }),
      ...(pageable.entity && {
        where: {
          ...pageable.entity,
          ...(filters && Object.assign({}, ...filters)),
        },
      }),
    };
    const total = await this.count(options as unknown);
    const result = await this.find(options as unknown);
    return { result, total };
  }
}
