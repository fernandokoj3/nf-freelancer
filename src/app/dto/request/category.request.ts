import { Type } from 'class-transformer';
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
import { PageBaseRequest, Sortable } from './base/page.base.request';

export enum CategoryOrder {
  ID = 'id',
  NAME = 'name',
  DESCRIPTION = 'description',
}

export class CategoryOneRequest {
  @Type(() => Number)
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  id: number;
}

export class CategoryRequest extends PageBaseRequest implements Sortable {
  @IsOptional()
  @IsString()
  @IsEnum(CategoryOrder, {
    message: ({ value, property }) => {
      return `${property} '${value}' is not a valid order on ${Object.values(
        CategoryOrder,
      ).join('|')}`;
    },
  })
  order: string = CategoryOrder.ID;

  @IsOptional()
  @IsNumberString()
  name: string;
}

export class CategoryPersist {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  description: string;
}
