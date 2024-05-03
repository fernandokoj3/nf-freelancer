import {
  DataSource,
  DataSourceOptions,
  useContainer,
  getConnectionManager,
  Connection,
} from 'typeorm';
import { resolve } from 'path';
import { Container } from 'typeorm-typedi-extensions';
import { DATABASE } from '../utils/constants';
import { CustomStrategy } from './strategies';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeds/main.seeder';

useContainer(Container);

const options: DataSourceOptions & SeederOptions = {
  database: DATABASE.NAME,
  username: DATABASE.USER,
  password: DATABASE.PWD,
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  type: DATABASE.TYPE,
  synchronize: DATABASE.SYNCHRONIZE,
  schema: DATABASE.SCHEMA,
  logging: DATABASE.LOGGING,
  entities: [resolve(__dirname, '../models/*{.ts,.js}')],
  migrations: [resolve(__dirname, '../database/migrations/*{.ts,.js}')],
  seeds: [MainSeeder],
  namingStrategy: new CustomStrategy(),
};

export const AppDataSource = new DataSource(options);

export const injectConnection = async () => {
  // try {
  //   return await AppDataSource.initialize();
  // } catch (error) {
  //   console.log(`Catched an error while connecting to db:`);
  //   console.log(error);
  // }

  let connection: Connection;
  if (getConnectionManager().has('default')) {
    connection = getConnectionManager().get('default');
  } else {
    connection = getConnectionManager().create(options);
  }

  if (!connection.isConnected) {
    await connection
      .connect()
      .catch(
        err => (
          console.log(`Catched an error while connecting to db:`),
          console.log(err)
        ),
      );
    return connection;
  }
};
