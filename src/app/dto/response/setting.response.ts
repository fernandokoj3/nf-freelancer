import { Expose } from 'class-transformer';

export class SettingResponse {
  @Expose()
  enabled: boolean;

  @Expose()
  timeout: number;
}
