import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { DiscountType } from "../types";

export function IsValidDiscount (validationOptions?: ValidationOptions) {
    return function(object:any, propertyName: string) {
        registerDecorator({
            name: 'isValidDiscount',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const obj = args.object as any;
                    const { discountType } = obj;

                    if (discountType === DiscountType.PERCENTAGE) {
                        return typeof value === 'number' && value >= 0 && value <= 100;
                    }
                    if (discountType === DiscountType.FIXED) {
                        return typeof value === 'number' && value >= 0;
                    }
                    return true;
                },
                defaultMessage(args: ValidationArguments) {
                    const obj = args.object as any;
                    const { discountType } = obj;
                    if (discountType === DiscountType.PERCENTAGE) {
                        return `Discount percentage cannot be greater than 100 or less than 0`;
                    }
                    if (discountType === DiscountType.FIXED) {
                        return `Discount amount cannot be less than 0`;
                    }
                    return `Discount amount must be a valid discount amount for ${discountType}`;
                }
            }
        })
    }
}
    