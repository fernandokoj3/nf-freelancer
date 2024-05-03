import { AppDataSource } from '@/database/data-source';
import { DATABASE } from '@/utils/constants';
import { exit } from 'process';

(async () => {
  try {
    const database = await AppDataSource.initialize();
    await database.createQueryRunner().createSchema(DATABASE.SCHEMA, true);
  } catch (error) {
    console.log(error);
  }
  exit();
})();
