import { UserOneRequest, UserPersist } from '@/dto/request/user.request';
import { UserRepository } from '@/repository/user.repository';
import { Service } from 'typedi';
import { EncryptionService } from '@/services/encryption.service';
import { plainToInstance } from 'class-transformer';
import { User } from '@/models/user';
import { BadRequest, NotFoundException } from '@/domain/exceptions/error.types';
import { UserResponse } from '@/dto/response/user.response';

@Service()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  public async create(userPersist: UserPersist): Promise<number> {
    if (await this.userRepository.findOneBy({ email: userPersist.email })) {
      throw new BadRequest(`User: ${userPersist.email} already registered`);
    }

    if (await this.userRepository.findOneBy({ ein: userPersist.cnpj })) {
      throw new BadRequest(`User: ${userPersist.cnpj} already registered`);
    }

    const user = plainToInstance(User, userPersist);
    user.password = this.encryptionService.encrypt(user.password);

    const result = await this.userRepository.save(user);
    return result.id;
  }

  public async one(userOneRequest: UserOneRequest): Promise<UserResponse> {
    const user = await this.userRepository.findOneBy({ id: userOneRequest.id });
    if (!user) {
      throw new NotFoundException(
        `User: ${userOneRequest.id} doest not exists`,
      );
    }
    return plainToInstance(UserResponse, user, { strategy: 'excludeAll' });
  }
}
