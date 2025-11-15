import { DiscountType } from "@/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class CouponUser {
    @Prop({type: SchemaTypes.ObjectId, ref: 'User'})
    customerId: Types.ObjectId;
    
    @Prop({type: Number, default: 0})
    count: number;
}

@Schema({ timestamps: true })
export class Coupon {
    readonly _id: Types.ObjectId;

    @Prop({type: String, required: true, unique: true })
    code: string;

    @Prop({type: Number, required: true})
    discountAmount: number;

    @Prop({type: String, required: true, enum: DiscountType, default: DiscountType.FIXED})
    discountType: DiscountType;

    @Prop({type: Date, required: true})
    startDate: Date;

    @Prop({type: Date, required: true})
    endDate: Date;
    
    @Prop({type: SchemaTypes.ObjectId, ref: 'User', required: true})
    createdBy: Types.ObjectId;
    
    @Prop({type: SchemaTypes.ObjectId, ref: 'User', required: true})
    updatedBy: Types.ObjectId;
    
    @Prop({type: Boolean, default: true})
    active: boolean;
    
    @Prop({type: [CouponUser]})
    usedBy: CouponUser[];

    @Prop({type: [CouponUser]})
    assignedTo: CouponUser[];
}

export const couponSchema = SchemaFactory.createForClass(Coupon);