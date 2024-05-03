import { DATABASE } from '@/utils/constants';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Categories1712445828585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'categories',
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
          isUnique: true,
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
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropIndex(`${DATABASE.SCHEMA}.categories`, 'name');
    queryRunner.dropTable(`${DATABASE.SCHEMA}.categories`);
  }
}
