import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose({ name: 'ein' })
  cnpj: string;

  @Expose({ name: 'phoneNumber' })
  phone_number: string;

  @Expose({ name: 'companyName' })
  company_name: string;
}
