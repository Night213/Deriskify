import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsEgyptianNationalIdConstraint implements ValidatorConstraintInterface {
    validate(id: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsEgyptianNationalId(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
