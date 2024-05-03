import { Service } from 'typedi';
import { UserRepository } from '@/repository/user.repository';
import { compareHash } from '@/utils/auth.utils';
import { AuthRequest } from '@/dto/request/auth.request';
import { ForbiddenException } from '@/domain/exceptions/error.types';
import { User } from '@/models/user';
import { encode } from '@/utils/jwt.utils';
import { AuthResponse } from '@/dto/response/auth.response';
import { log } from '@/utils/log.utils';

@Service()
export class AuthService {
  constructor(private readonly repository: UserRepository) {}

  public async signin(authRequest: AuthRequest): Promise<AuthResponse> {
    log.info('Start sign');
    const user = await this.validate(authRequest);

    log.info('User has validated');
    const payload = {
      user_id: user.id,
      client_id: authRequest.login,
    };

    log.info('Enconding user', { login: user.email });
    const jwt = encode(payload, authRequest.login);

    return AuthResponse.create(true, jwt);
  }

  private async validate(authRequest: AuthRequest): Promise<User> {
    log.info('Start validate ', { login: authRequest.login });
    const userResponse = await this.repository.findOneBy({
      email: authRequest.login,
    });
    if (!userResponse) {
      log.error(`User ${authRequest.login} not exists`);
      return Promise.reject(new ForbiddenException('Invalid credentials'));
    }

    log.info('Hash password ', { login: authRequest.login });
    const { password } = userResponse;
    if (!compareHash(authRequest.password, password)) {
      log.error(`User ${authRequest.password} password does not matched`);
      return Promise.reject(new ForbiddenException('Invalid credentials'));
    }

    return Promise.resolve(userResponse);
  }
}
