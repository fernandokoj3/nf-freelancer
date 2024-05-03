import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer';
import { Category } from './category';
import { BaseModel } from './base/base.model';

@Entity({ name: 'expenses', schema: 'nf_freelancer' })
export class Expense extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'accrual_date' })
  accrualDate: Date;

  @Column({ name: 'transaction_date' })
  transactionDate: Date;

  @OneToOne(() => Customer)
  @JoinColumn([{ name: 'customer_id' }])
  customer?: Customer;

  @OneToOne(() => Category)
  @JoinColumn([{ name: 'category_id' }])
  category: Category;
}
