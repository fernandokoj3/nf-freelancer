import { Request, Response } from 'express';
import { Controller, Get } from '@/utils/inject.utils';
import { register } from '@/domain/metrics';

@Controller('/metrics')
export class MetricsController {
  @Get('/')
  public async metrics(_: Request, response: Response) {
    response.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    response.end(metrics);
  }
}
