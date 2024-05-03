import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseRepository } from './base/base.repository';
import { User } from '@/models/user';

@Service()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
