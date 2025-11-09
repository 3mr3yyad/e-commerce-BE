import { DiscountType } from "@/common";
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, {message: 'Name must be at least 2 characters long'})
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10, {message: 'Description is too short'})
    description: string;

    @IsMongoId()
    @IsNotEmpty()
    brandId: Types.ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    categoryId: Types.ObjectId;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsOptional()
    discountAmount: number;

    @IsEnum(DiscountType)
    discountType: DiscountType;

    @IsNumber()
    @IsOptional()
    stock: number;

    @IsArray()
    @IsString({each: true})
    colors: string[];

    @IsArray()
    @IsString({each: true})
    sizes: string[];


    images: object[]; // todo
}
