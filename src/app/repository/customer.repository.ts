import { Service } from 'typedi';
import { BaseRepository } from './base/base.repository';
import { Customer } from '@/models/customer';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class CustomerRepository extends BaseRepository<Customer> {
  constructor(@InjectRepository(Customer) repository: Repository<Customer>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
