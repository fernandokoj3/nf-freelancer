import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import {
  CreateUsers,
  CreateCustomers,
  CreateRevenues,
  CreateExpenses,
  CreateCategories,
} from './nffreelancer.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, _: SeederFactoryManager): Promise<void> {
    await runSeeder(dataSource, CreateUsers);
    await runSeeder(dataSource, CreateCustomers);
    await runSeeder(dataSource, CreateRevenues);
    await runSeeder(dataSource, CreateCategories);
    await runSeeder(dataSource, CreateExpenses);
  }
}
