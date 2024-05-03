import { NextFunction, Response } from 'express';
import { verify } from '@/utils/jwt.utils';
import { log } from '@/utils/log.utils';
import { validateObject } from './schema.validation';
import { TokenRequest } from '@/dto/request/auth.request';
import { ForbiddenException } from '@/domain/exceptions/error.types';
import { HttpStatusCode } from '@/domain/verbs';

export const authorizer = async (
  request: any,
  response: Response,
  next: NextFunction,
) => {
  const { error, data } = await validateObject(request.headers, TokenRequest);

  if (error) {
    return response.status(HttpStatusCode.BAD_REQUEST).json(error);
  }

  try {
    request.user = await verify(data.authorization.replace('Bearer ', ''));
    return next();
  } catch (error) {
    log.error('Authorizer error', { error });
    throw new ForbiddenException('Invalid token');
  }
};
