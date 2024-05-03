export type Config = {
  enabled: boolean;
  timeout: number;
  unhealthy: boolean;
};

export const Settings: Config = {
  enabled: false,
  timeout: 0,
  unhealthy: false,
};
