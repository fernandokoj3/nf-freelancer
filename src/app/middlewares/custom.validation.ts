import {
  buildMessage,
  ValidateBy,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import matchesValidator from 'validator/lib/matches';
import { Region } from '@/domain/region';
import { isValidCnpj } from '@/utils/object.utils';
import { MIN_TO_VALIDATE } from '@/utils/constants';

export const IS_BIGINT = 'isBigInt';
export const IS_REGION_NUMBER = 'IsRegionNumber';
export const HAS_AT_LEAST_ONE = 'HasAtLeastOne';
export const IS_VALID_NUMBER = 'IsValidNumber';
export const IS_VALID_CNPJ = 'IsValidCNPJ';
export const IS_VALID_YEAR = 'IsValidYear';

export function IsBigInt(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_BIGINT,
      validator: {
        validate: (value: number | string, _): boolean => {
          let hasType =
            typeof value === 'number' ||
            typeof value === 'string' ||
            typeof value === 'bigint';
          if (hasType) {
            return (
              matchesValidator(`${value}`, /^(-)?[0-9]+$/) ||
              matchesValidator(`${value}`, /^(-)[0-9]+n+$/)
            );
          }
          return false;
        },
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + '$property must be a BigInt',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export function IsValidYear(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_VALID_YEAR,
      validator: {
        validate: (value: number, _): boolean => {
          const currentYear = new Date().getFullYear();
          const minYear = MIN_TO_VALIDATE.YEAR;
          const maxYear = currentYear + MIN_TO_VALIDATE.ADD_FROM_CURRENT;
          return value >= minYear && value <= maxYear;
        },
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + '$property must a valid year number',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export function IsValidCnpj(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_VALID_CNPJ,
      validator: {
        validate: (value: number | string, _): boolean => {
          return isValidCnpj(value);
        },
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + 'cnpj must a valid cnpj number',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

export function IsRegionNumber(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy({
    name: IS_REGION_NUMBER,
    validator: {
      validate: (value: string, _): boolean => {
        if (!value) {
          return false;
        }

        let splited = value.split(/\s/);
        if (splited.length !== 2) {
          return false;
        }
        let region = splited[0].toLowerCase();
        let valid =
          Object.keys(Region)[
            Object.values(Region).indexOf(region as unknown as Region)
          ];
        if (!valid) {
          return false;
        }
        return true;
      },
      defaultMessage: buildMessage(
        eachPrefix => eachPrefix + '$property must be a region with number',
        validationOptions,
      ),
    },
  });
}

export function IsValidNumber(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy({
    name: IS_VALID_NUMBER,
    validator: {
      validate: (value: string | number, _): boolean => {
        return matchesValidator(`${value}`, /^[0-9]+$/);
      },
      defaultMessage: buildMessage(
        eachPrefix => eachPrefix + '$property must be a valid number',
        validationOptions,
      ),
    },
  });
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
}
