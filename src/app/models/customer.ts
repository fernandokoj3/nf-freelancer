import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Revenue } from './revenue';
import { BaseModel } from './base/base.model';

@Entity({ name: 'customers', schema: 'nf_freelancer' })
export class Customer extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ein' })
  ein: string;

  @Column({ name: 'commercial_name' })
  commercialName: string;

  @Column({ name: 'legal_name' })
  legalName: string;

  @OneToMany(() => Revenue, revenue => revenue.customer)
  revenues?: Revenue[];
}
