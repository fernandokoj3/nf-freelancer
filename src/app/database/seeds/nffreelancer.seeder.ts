import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { createReadStream } from 'fs';
import { parse } from 'csv';
import { resolve } from 'path';
import { User } from '@/models/user';
import { Customer } from '@/models/customer';
import Container, { Service } from 'typedi';
import { EncryptionService } from '@/services/encryption.service';
import { Revenue } from '@/models/revenue';
import { Expense } from '@/models/expense';
import { Category } from '@/models/category';

@Service()
export class CreateUsers implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(User);
    const encryptionService = Container.get(EncryptionService);
    const file = resolve(__dirname, './user.csv');
    const headers = [
      'name',
      'email',
      'ein',
      'companyName',
      'phoneNumber',
      'password',
    ];
    const rows = await process(file, headers);

    const parsed = rows.map(r => {
      return {
        ...r,
        password: encryptionService.hash(r.password),
      };
    });

    await repository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(parsed)
      .orIgnore('("email", "ein") DO NOTHING')
      .execute();
  }
}

export class CreateCustomers implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(Customer);
    const file = resolve(__dirname, './customers.csv');
    const headers = ['ein', 'commercialName', 'legalName'];
    const rows = await process(file, headers);
    await repository
      .createQueryBuilder()
      .insert()
      .into(Customer)
      .values(rows)
      .orIgnore('("ein") DO NOTHING')
      .execute();
  }
}

export class CreateRevenues implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(Revenue);
    const file = resolve(__dirname, './revenues.csv');
    const headers = [
      'amount',
      'invoiceId',
      'accrualDate',
      'transactionDate',
      'description',
      'customerId',
    ];
    const rows = await process(file, headers);
    const parsed = rows.map(r => {
      return plainToInstance(Revenue, {
        ...r,
        customer: { id: parseInt(r.customerId) },
      });
    });
    await repository
      .createQueryBuilder()
      .insert()
      .into(Revenue)
      .values(parsed)
      .orIgnore('("invoice_id") DO NOTHING')
      .execute();
  }
}

export class CreateCategories implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(Category);
    const file = resolve(__dirname, './categories.csv');
    const headers = ['name', 'description'];
    const rows = await process(file, headers);

    await repository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(rows)
      .orIgnore('("name") DO NOTHING')
      .execute();
  }
}

export class CreateExpenses implements Seeder {
  public async run(
    dataSource: DataSource,
    _: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(Expense);
    const file = resolve(__dirname, './expenses.csv');
    const headers = [
      'amount',
      'description',
      'accrualDate',
      'transactionDate',
      'categoryId',
      'customerId',
    ];
    const rows = await process(file, headers);
    const parsed = rows.map(r => {
      return plainToInstance(Expense, {
        ...r,
        customer: { id: parseInt(r.customerId) },
        category: { id: parseInt(r.categoryId) },
      });
    });
    await repository
      .createQueryBuilder()
      .insert()
      .into(Expense)
      .values(parsed)
      .orIgnore('("ein") DO NOTHING')
      .execute();
  }
}

const process = async (file: string, columns: string[]) => {
  return new Promise<any[]>((resolve, reject) => {
    let rows: any[] = [];
    createReadStream(file)
      .pipe(parse({ delimiter: ',', fromLine: 2, columns }))
      .on('data', async row => {
        rows = [...rows, row];
      })
      .on('close', () => {
        resolve(rows);
      })
      .on('error', err => {
        reject(err);
      });
  });
};
