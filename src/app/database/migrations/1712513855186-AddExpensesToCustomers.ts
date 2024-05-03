import { DATABASE } from '@/utils/constants';
import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddExpensesToCustomers1712513855186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'expenses',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedSchema: DATABASE.SCHEMA,
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('customers');
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('customer_id') !== -1,
    );
    await queryRunner.dropForeignKey('customers', foreignKey);
  }
}
