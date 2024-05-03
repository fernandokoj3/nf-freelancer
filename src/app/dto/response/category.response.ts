import { Expose } from 'class-transformer';

export class CategoryResponse {
  @Expose({ name: 'name' })
  name: string;

  @Expose({ name: 'description' })
  description: string;
}
