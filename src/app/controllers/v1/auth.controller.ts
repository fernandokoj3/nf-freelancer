import { Request, Response } from 'express';
import { Controller, Post } from '@/utils/inject.utils';
import { getBodyValidator } from '@/middlewares/handler.validation';
import { AuthRequest } from '@/dto/request/auth.request';
import { AuthService } from '@/services/v1/auth.service';
import { HttpStatusCode } from '@/domain/verbs';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('', getBodyValidator(AuthRequest))
  public async login(request: Request, response: Response) {
    const authRequest = request.body as AuthRequest;
    const authResponse = await this.authService.signin(authRequest);
    return response.status(HttpStatusCode.OK).send({ ...authResponse });
  }
}
