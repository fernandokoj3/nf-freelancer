import { BadRequest, NotFoundException } from '@/domain/exceptions/error.types';
import {
  CategoryPersist,
  CategoryRequest,
} from '@/dto/request/category.request';
import {
  PageMetaResponse,
  PageResponse,
} from '@/dto/response/base/page.base.response';
import { CategoryResponse } from '@/dto/response/category.response';
import { Category } from '@/models/category';
import { CategoryRepository } from '@/repository/categopry.repository';
import { plainToInstance } from 'class-transformer';
import { Service } from 'typedi';

@Service()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async create(request: CategoryPersist): Promise<number> {
    const category = await this.categoryRepository.findOneBy({
      name: request.name,
    });

    if (category) {
      throw new BadRequest(`Category: ${category.name} already exists`);
    }

    const entity = plainToInstance(Category, request);
    const { id } = await this.categoryRepository.save(entity);
    return id;
  }

  public async one(id: number): Promise<CategoryResponse> {
    const category = await this.categoryRepository.findOneBy({
      id,
    });

    if (!category) {
      throw new NotFoundException(`Category: ${category.name} not found`);
    }
    return plainToInstance(CategoryResponse, category, {
      strategy: 'excludeAll',
    });
  }

  public async list(
    categoryRequest: CategoryRequest,
  ): Promise<PageResponse<CategoryResponse>> {
    const pageable = CategoryRequest.get(categoryRequest, Category);

    const { result, total } = await this.categoryRepository.page(pageable);

    const meta = new PageMetaResponse(pageable, total, result.length);
    const content = plainToInstance(CategoryResponse, result, {
      strategy: 'excludeAll',
    });

    return new PageResponse(content, meta);
  }

  public async update(
    id: number,
    categoryPersist: CategoryPersist,
  ): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category: ${id} doest not exists`);
    }

    const entity = plainToInstance(Category, { ...categoryPersist, id });
    await this.categoryRepository.save(entity);
  }

  public async archive(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category: ${id} doest not exists`);
    }
    await this.categoryRepository.softDelete(id);
  }
}
