import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { DATABASE } from '@/utils/constants';

export class AddReveneusToCustomers1712520600446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'revenues',
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
    const table = await queryRunner.getTable('revenues');
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('customer_id') !== -1,
    );
    await queryRunner.dropForeignKey('revenues', foreignKey);
  }
}
