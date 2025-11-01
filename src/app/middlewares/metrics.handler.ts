import { NextFunction, Request, Response } from 'express';
import { httpRequestDuration, httpRequestsTotal } from '@/domain/metrics';

export async function settingHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    const route = (req.route?.path || req.path || 'unknown').toString();
    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode.toString(),
    };
    end(labels);
    httpRequestsTotal.inc(labels);
  });
  next();
}
