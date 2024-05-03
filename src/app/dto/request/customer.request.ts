import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { PageBaseRequest, Sortable } from './base/page.base.request';
import { IsValidCnpj } from '@/middlewares/custom.validation';

export enum CustomerRequestOrder {
  ID = 'id',
  COMMERCIAL_NAME = 'commercial_name',
  LEGAL_NAME = 'legal_name',
  CPNJ = 'ein',
}

export class CustomerPersist {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(14)
  @IsValidCnpj()
  @Expose({ name: 'cnpj' })
  ein: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'commercial_name' })
  @MaxLength(50)
  commercialName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'legal_name' })
  @MaxLength(50)
  legalName: string;
}

export class CustomerOneRequest {
  @Type(() => Number)
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  id: number;
}

export class CustomerRequest extends PageBaseRequest implements Sortable {
  @IsOptional()
  @IsString()
  @IsEnum(CustomerRequestOrder, {
    message: ({ value, property }) => {
      return `${property} '${value}' is not a valid order on ${Object.values(
        CustomerRequestOrder,
      ).join('|')}`;
    },
  })
  order: string = CustomerRequestOrder.ID;

  @IsOptional()
  @IsNumberString()
  @Expose({ name: 'cnpj' })
  ein: string;

  @IsOptional()
  @IsString()
  @Expose({ name: 'commercial_name' })
  @MaxLength(50)
  commercialName: string;

  @IsOptional()
  @IsString()
  @Expose({ name: 'legal_name' })
  @MaxLength(50)
  legalName: string;
}

export class CustomerMerge {
  @IsOptional()
  @IsNumberString()
  @Expose({ name: 'cnpj' })
  ein: string;

  @IsOptional()
  @IsString()
  @Expose({ name: 'commercial_name' })
  @MaxLength(50)
  commercialName: string;

  @IsOptional()
  @IsString()
  @Expose({ name: 'legal_name' })
  @MaxLength(50)
  legalName: string;
}
