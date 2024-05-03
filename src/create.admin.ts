import { exit } from 'process';
import { injectConnection } from '@/database/data-source';
import { User } from '@/models/user';
import { UserRepository } from '@/repository/user.repository';
import { EncryptionService } from '@/services/encryption.service';
import { log } from '@/utils/log.utils';
import Container, { Service } from 'typedi';

@Service()
class GenerateAdmin {
  constructor(
    private readonly encryptService: EncryptionService,
    private readonly userRepository: UserRepository,
  ) {}

  public async create() {
    const user = new User();
    user.companyName = 'ADMIN';
    user.ein = '000000000000';
    user.email = 'admin@nffreelancer.com';
    user.name = 'ADMIN';
    user.password = this.encryptService.hash('admin');
    return await this.userRepository.upsert(user, ['email']);
  }
}

(async () => {
  await injectConnection();

  const service: GenerateAdmin = Container.get(GenerateAdmin);
  const result = await service.create();
  log.info('Data generated', { result });
  exit();
})();
