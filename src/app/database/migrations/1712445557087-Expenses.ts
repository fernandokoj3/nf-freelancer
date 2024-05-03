import { DATABASE } from '@/utils/constants';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Expenses1712445557087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'expenses',
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
          name: 'amount',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'text',
          isNullable: false,
        },
        {
          name: 'accrual_date',
          type: 'date',
          isNullable: false,
        },
        {
          name: 'transaction_date',
          type: 'date',
          isNullable: false,
        },
        {
          name: 'category_id',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'customer_id',
          type: 'integer',
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
        columnNames: ['customer_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropIndex(`${DATABASE.SCHEMA}.expenses`, 'customer_id');
    queryRunner.dropTable(`${DATABASE.SCHEMA}.expenses`);
  }
}
