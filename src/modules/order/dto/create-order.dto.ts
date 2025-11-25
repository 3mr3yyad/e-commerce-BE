import { DiscountType, PaymentMethod } from "@/common";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

class OrderAdressDto{
            @IsString()
        details: string;

        @IsString()
        street: string;

        @IsString()
        city: string;

        @IsString()
        state: string;

        @IsString()
        govrnate: string;

        @IsString()
        country: string;

        @IsString()
        phoneNumber: string
}

class OrderCopounDto {
    @IsMongoId()
    @IsNotEmpty()
    copounId: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsNumber()
    @IsNotEmpty()
    discountAmount: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(DiscountType)
    discountType: DiscountType;
}

class OrderProductDto {
    @IsMongoId()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @IsObject()
    address: OrderAdressDto;

    @IsString()
    @IsEnum(PaymentMethod)
    @IsOptional()
    paymentMethod?: PaymentMethod;

    @IsObject()
    @IsOptional()
    copoun : OrderCopounDto;

    @IsObject()
    @IsOptional()
    products ?: OrderProductDto[];
}
