import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './base/base.model';

@Entity({ name: 'categories', schema: 'nf_freelancer' })
export class Category extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;
}
