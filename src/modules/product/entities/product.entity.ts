import { DiscountType } from "@/common";
import { Types } from "mongoose";

export class Product {
    readonly _id: Types.ObjectId;
    name: string;
    slug: string;
    description: string;
    brandId: Types.ObjectId;
    categoryId: Types.ObjectId;
    createdby: Types.ObjectId;
    updatedby: Types.ObjectId;
    price: number;
    discountAmount: number;
    discountType: DiscountType;
    finalPrice: number;
    stock: number;
    sold: number;
    colors: string[];
    sizes: string[];
    images: object[];
    deleted: boolean;
}


