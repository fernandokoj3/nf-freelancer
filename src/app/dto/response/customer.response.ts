import { Expose } from 'class-transformer';

export class CustomerResponse {
  @Expose()
  id: string;

  @Expose({ name: 'ein' })
  cnpj: string;

  @Expose({ name: 'commercialName' })
  commercial_name: string;

  @Expose({ name: 'legalName' })
  legal_name: string;
}
