import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseRepository } from './base/base.repository';
import { Expense } from '@/models/expense';

@Service()
export class ExpenseRepository extends BaseRepository<Expense> {
  constructor(@InjectRepository(Expense) repository: Repository<Expense>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
