import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import { DATABASE } from '@/utils/constants';

export class Revenues1712444859345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'revenues',
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
          name: 'invoice_id',
          type: 'varchar(100)',
          isNullable: false,
          isUnique: true,
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
          name: 'customer_id',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'text',
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
        columnNames: ['invoice_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropIndex(`${DATABASE.SCHEMA}.revenues`, 'invoice_id');
    queryRunner.dropTable(`${DATABASE.SCHEMA}.revenues`);
  }
}
