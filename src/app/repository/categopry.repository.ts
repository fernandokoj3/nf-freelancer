import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseRepository } from './base/base.repository';
import { Category } from '@/models/category';

@Service()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(@InjectRepository(Category) repository: Repository<Category>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
