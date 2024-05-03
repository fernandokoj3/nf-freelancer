import { runSeeders } from 'typeorm-extension';
import { AppDataSource } from '../data-source';

AppDataSource.initialize().then(async () => {
  await runSeeders(AppDataSource);
  process.exit();
});
