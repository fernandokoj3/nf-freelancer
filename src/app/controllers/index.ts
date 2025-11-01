import { HealthController } from './health.controller';
import { SettingController } from './setting.controller';
import { AuthController } from './v1/auth.controller';
import { CategoryController } from './v1/category.controller';
import { CustomerController } from './v1/customer.controller';
import { ExpenseController } from './v1/expense.controller';
import { MetricsController } from './v1/metrics.controller';
import { ReportController } from './v1/report.controller';
import { RevenueController } from './v1/revenue.controller';
import { UserController } from './v1/user.controller';

export default {
  SettingController,
  CategoryController,
  ExpenseController,
  ReportController,
  CustomerController,
  RevenueController,
  AuthController,
  UserController,
  HealthController,
  MetricsController,
};
