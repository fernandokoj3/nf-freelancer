import { DATABASE } from '@/utils/constants';
import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddExpensesToCategories1712513524037
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'expenses',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedSchema: DATABASE.SCHEMA,
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('expenses');
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('category_id') !== -1,
    );
    await queryRunner.dropForeignKey('expenses', foreignKey);
  }
}
