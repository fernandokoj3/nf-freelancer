import client from 'prom-client';
const _register = new client.Registry();

client.collectDefaultMetrics({
  register: _register,
  prefix: 'app_nf_freelancer_api',
});

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['method', 'route', 'status_code'] as const,
  // buckets típicos para APIs web
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
});

export const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Contador de requisições HTTP',
  labelNames: ['method', 'route', 'status_code'] as const,
});

export const exampleGauge = new client.Gauge({
  name: 'example_gauge_current_jobs',
  help: 'Exemplo de gauge: trabalhos em andamento',
});

_register.registerMetric(httpRequestDuration);
_register.registerMetric(httpRequestsTotal);
_register.registerMetric(exampleGauge);

export const register = _register;
