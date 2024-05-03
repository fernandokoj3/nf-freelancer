import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { DATABASE } from '@/utils/constants';

export class User1712442414661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'users',
      schema: DATABASE.SCHEMA,
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar(50)',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar(50)',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'ein',
          type: 'varchar(20)',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'company_name',
          type: 'varchar(50)',
          isNullable: false,
        },
        {
          name: 'phone_number',
          type: 'varchar(20)',
          isNullable: true,
        },
        {
          name: 'password',
          type: 'varchar(200)',
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
        },
      ],
    });
    await queryRunner.createTable(table, true);
    await queryRunner.createIndex(
      table,
      new TableIndex({
        columnNames: ['email'],
      }),
    );
    await queryRunner.createIndex(
      table,
      new TableIndex({
        columnNames: ['ein'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropIndex(`${DATABASE.SCHEMA}.users`, 'email');
    queryRunner.dropTable(`${DATABASE.SCHEMA}.users`);
  }
}
