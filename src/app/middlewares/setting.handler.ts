import { NextFunction, Request, Response } from 'express';
import { Settings } from '@/domain/settings';
import { HttpStatusCode } from '@/domain/verbs';

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export async function settingHandler(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  if (Settings.enabled) {
    if (Settings.timeout > 0) {
      await sleep(Settings.timeout * 1000);
    }
    if (Settings.unhealthy) {
      return res
        .status(HttpStatusCode.SERVICE_UNAVAILABLE)
        .json({ message: 'unhealthy' });
    }
  }
  return next();
}

export const unless = function (path: RegExp, middleware: Function) {
  return function (req: Request, res: Express.Response, next: Function) {
    if (path.test(req.path)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};
