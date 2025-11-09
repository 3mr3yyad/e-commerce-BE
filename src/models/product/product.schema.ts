import { DiscountType } from "@/common";
import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class Product {
    readonly _id: Types.ObjectId;

    @Prop({type: String, required: true , trim: true})
    name: string;

    @Prop({type: String, required: true , trim: true})
    slug: string;

    @Prop({type: String, trim: true})
    description: string;

    @Prop({type: SchemaTypes.ObjectId, required: true, ref: 'Brand' })
    brandId: Types.ObjectId;

    @Prop({type: SchemaTypes.ObjectId, required: true, ref: 'Category' })
    categoryId: Types.ObjectId;

    @Prop({type: SchemaTypes.ObjectId, required: true, ref: 'User' })
    createdby: Types.ObjectId;

    @Prop({type: SchemaTypes.ObjectId, required: true, ref: 'User' })
    updatedby: Types.ObjectId;

    @Prop({type: Number, required: true, min:1})
    price: number;

    @Prop({type: Number, default:0, min:0})
    discountAmount: number;

    @Prop({type: String, enum:DiscountType, default:DiscountType.FIXED})
    discountType: DiscountType;

    @Virtual({
        get: function(this: Product) {
            if(this.discountType == DiscountType.FIXED) {
                return this.price - this.discountAmount;
            } 
            return this.price - this.price * (this.discountAmount / 100);
        }
    })
    finalPrice: number;

    @Prop({type: Number, default:1, min:0})
    stock: number;

    @Prop({type: Number})
    sold: number;

    @Prop({type: [String]})
    colors: string[];

    @Prop({type: [String]})
    sizes: string[];

    images: object[];
}



export const ProductSchema = SchemaFactory.createForClass(Product);
