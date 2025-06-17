import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isValid } from 'egyptian-nationalid';

@ValidatorConstraint({ name: 'IsEgyptianNationalId', async: false })
export class IsEgyptianNationalIdConstraint
  implements ValidatorConstraintInterface
{
  validate(id: string): boolean {
    if (id.length !== 14) return false;
    return isValid(id);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid Egyptian National ID`;
  }
}

export function IsEgyptianNationalId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsEgyptianNationalIdConstraint,
    });
  };
}
