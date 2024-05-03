import { plainToInstance } from 'class-transformer';
import { Service } from 'typedi';
import { NotFoundException } from '@/domain/exceptions/error.types';
import { ExpensePersist } from '@/dto/request/expensive.request';
import { Expense } from '@/models/expense';
import { CategoryRepository } from '@/repository/categopry.repository';
import { CustomerRepository } from '@/repository/customer.repository';
import { ExpenseRepository } from '@/repository/expensive.repository';

@Service()
export class ExpenseService {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  public async create(
    categoryId: number,
    expensePersist: ExpensePersist,
  ): Promise<number> {
    const customer = await this.customerRepository.findOneBy({
      id: expensePersist.customerId,
    });
    if (!customer) {
      throw new NotFoundException(
        `Customer: ${expensePersist.customerId} not exists`,
      );
    }

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      throw new NotFoundException(`Category: ${categoryId} not exists`);
    }

    const entity = plainToInstance(Expense, expensePersist);
    entity.category = category;
    entity.customer = customer;

    const { id } = await this.expenseRepository.save(entity);
    return id;
  }

  public async update(
    expenseId: number,
    expensePersist: ExpensePersist,
  ): Promise<number> {
    const customer = await this.customerRepository.findOneBy({
      id: expensePersist.customerId,
    });
    if (!customer) {
      throw new NotFoundException(
        `Customer: ${expensePersist.customerId} not exists`,
      );
    }

    const expense = await this.expenseRepository.findOne({
      where: { id: expenseId },
      relations: { category: true },
    });
    if (!expense) {
      throw new NotFoundException(`Expense: ${expenseId} not exists`);
    }

    const entity = plainToInstance(Expense, { ...expense, ...expensePersist });
    entity.customer = customer;

    const { id } = await this.expenseRepository.save(entity);
    return id;
  }

  public async remove(id: number): Promise<void> {
    const expense = await this.expenseRepository.findOneBy({ id });
    if (!expense) {
      throw new NotFoundException(`Expense: ${id} alredy exists`);
    }
    await this.expenseRepository.manager
      .createQueryBuilder()
      .delete()
      .from(Expense)
      .where({ id })
      .execute();
  }
}
