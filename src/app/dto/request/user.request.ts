import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { IsValidCnpj, Match } from '@/middlewares/custom.validation';
import { Expose, Transform, Type } from 'class-transformer';

export class UserPersist {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
    message:
      'Password should contains (special characters, numbers, uppercase and lowercase letters)',
  })
  @MaxLength(32)
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @Match('password')
  @MaxLength(32)
  @Expose({ name: 'confirm_password' })
  confirmPassword: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @IsValidCnpj()
  cnpj: string;

  @IsDefined()
  @IsNotEmpty()
  @Expose({ name: 'company_name' })
  companyName: string;

  @IsDefined()
  @IsNumberString()
  @Expose({ name: 'phone_number' })
  phoneNumber: string;

  @Expose({ name: 'ein' })
  @Transform(({ obj }) => obj.cnpj)
  ein: string;
}

export class UserOneRequest {
  @Type(() => Number)
  @IsDefined()
  @IsNumber()
  @IsPositive()
  @Min(1)
  id: number;
}
