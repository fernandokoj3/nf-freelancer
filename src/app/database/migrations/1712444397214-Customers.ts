import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { DATABASE } from '@/utils/constants';

export class Customers1712444397214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'customers',
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
          name: 'ein',
          type: 'varchar(20)',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'commercial_name',
          type: 'varchar(100)',
          isNullable: false,
        },
        {
          name: 'legal_name',
          type: 'varchar(50)',
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
        columnNames: ['ein'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropIndex(`${DATABASE.SCHEMA}.customers`, 'ein');
    queryRunner.dropTable(`${DATABASE.SCHEMA}.customers`);
  }
}
