import { Settings } from '@/domain/settings';
import { SettingRequest } from '@/dto/request/setting.request';
import { SettingResponse } from '@/dto/response/setting.response';
import { Controller, Get, Patch, Post } from '@/utils/inject.utils';
import { plainToInstance } from 'class-transformer';
import { Response, Request } from 'express';

@Controller('/settings')
export class SettingController {
  @Patch('')
  public async merge(request: Request, response: Response) {
    const settingRequest = request.body as SettingRequest;

    Settings.timeout = settingRequest.timeout ?? Settings.timeout;
    Settings.unhealthy = settingRequest.unhealthy ?? Settings.unhealthy;

    const result = plainToInstance(SettingResponse, Settings);
    return response.json(result);
  }

  @Get('/')
  public async one(_: Request, response: Response) {
    const result = plainToInstance(SettingResponse, Settings);
    return response.json(result);
  }

  @Post('/enable')
  public async enabled(_: Request, response: Response) {
    Settings.enabled = true;
    const result = plainToInstance(SettingResponse, Settings);
    return response.json(result);
  }

  @Post('/disable')
  public async unhealth(_: Request, response: Response) {
    Settings.enabled = false;
    const result = plainToInstance(SettingResponse, Settings);
    return response.json(result);
  }
}
