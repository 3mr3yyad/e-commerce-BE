import { DiscountType, IsValidDiscount } from "@/common";
import { IsArray, IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, Length, MinDate } from "class-validator";
import { Types } from "mongoose";

export class CreateCouponDto {

    @IsString()
    @IsNotEmpty()
    @Length(5, 5, {message: 'Code must be 5 characters long'})
    code: string;

    @IsNotEmpty()
    @IsValidDiscount()
    discountAmount: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(DiscountType)
    discountType: DiscountType;

    @IsDate()
    @IsNotEmpty()
    @MinDate(new Date(Date.now() - 24 * 60 * 60 * 1000))
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    @MinDate(new Date(Date.now() - 24 * 60 * 60 * 1000))
    endDate: Date;

    @IsBoolean()
    active: boolean;

    @IsArray()
    @IsMongoId({each: true})
    assignedTo: Types.ObjectId[];
}
