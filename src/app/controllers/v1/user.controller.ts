import { Request, Response } from 'express';
import { Controller, Get, Post } from '@/utils/inject.utils';
import {
  getBodyValidator,
  getUrlParamValidator,
} from '@/middlewares/handler.validation';
import { HttpStatusCode } from '@/domain/verbs';
import { UserOneRequest, UserPersist } from '@/dto/request/user.request';
import { UserService } from '@/services/v1/user.service';
import { authorizer } from '@/middlewares/authorizer.validator';

@Controller('/users', authorizer)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('', getBodyValidator(UserPersist))
  public async create(request: Request, response: Response) {
    const userRequest = request.body as UserPersist;
    const id = await this.userService.create(userRequest);
    return response.status(HttpStatusCode.OK).send({ user_id: id });
  }

  @Get('/:id', getUrlParamValidator(UserOneRequest))
  public async one(request: Request, response: Response) {
    const userRequest = request.params as unknown as UserOneRequest;
    const result = await this.userService.one(userRequest);
    return response.status(HttpStatusCode.OK).send({ ...result });
  }
}
