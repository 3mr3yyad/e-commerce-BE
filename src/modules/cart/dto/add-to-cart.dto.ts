import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class AddToCartDto {
    @IsMongoId()
    @IsNotEmpty()
    productId: Types.ObjectId;

    @IsOptional()
    @IsNumber()
    quantity: number;
}
