import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base/base.model';

@Entity({ name: 'users', schema: 'nf_freelancer' })
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'ein' })
  ein: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'password' })
  password: string;
}
