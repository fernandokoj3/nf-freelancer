import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer';
import { BaseModel } from './base/base.model';

@Entity({ name: 'revenues', schema: 'nf_freelancer' })
export class Revenue extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'invoice_id' })
  invoiceId: string;

  @Column({ name: 'accrual_date', type: 'date' })
  accrualDate: Date;

  @Column({ name: 'transaction_date', type: 'date' })
  transactionDate: Date;

  @Column({ name: 'description' })
  description: string;

  @OneToOne(() => Customer)
  @JoinColumn([{ name: 'customer_id' }])
  customer: Customer;
}
