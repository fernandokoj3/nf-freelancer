import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export class SettingRequest {
  @IsNumber()
  @Expose({ name: 'timeout' })
  timeout: number;

  @IsBoolean()
  @Expose({ name: 'unhealthy' })
  unhealthy: boolean;
}
