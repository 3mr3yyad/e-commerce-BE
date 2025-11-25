import { DiscountType, OrderStatus, PaymentMethod } from "@/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: false, _id: false })
export class OrderAdress {
    @Prop({ type: String, required: true })
    details: string;

    @Prop({ type: String, required: true })
    street: string;

    @Prop({ type: String, required: true })
    city: string;

    @Prop({ type: String, required: true })
    state: string;

    @Prop({ type: String, required: true })
    govrnate: string;

    @Prop({ type: String, required: true })
    country: string;

    @Prop({ type: String, required: true })
    phoneNumber: string
}

@Schema({ timestamps: false, _id: false })
export class OrderProduct {
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Product' })
    productId: Types.ObjectId;

    @Prop({ type: Number, required: true })
    quantity: number;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: Number })
    discount: number;

    @Prop({ type: Number, required: true })
    totalPrice: number;
}

@Schema({ timestamps: false, _id: false })
export class OrderCopoun {
    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Coupon' })
    copounId: Types.ObjectId;

    @Prop({ type: Number, required: true })
    discountAmount: number;

    @Prop({ type: String, enum: DiscountType, required: true })
    discountType: DiscountType;
}

@Schema({ timestamps: true })
export class Order {
    readonly _id: Types.ObjectId;

    @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ type: OrderAdress, required: true })
    address: OrderAdress;

    @Prop({ type: [OrderProduct], required: true })
    products: OrderProduct[];

    @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.COD })
    paymentMethod: PaymentMethod;

    @Prop({
        type: String, enum: OrderStatus,
        default: function () {
            this.paymentMethod == PaymentMethod.COD ? OrderStatus.PLACED : OrderStatus.PLACED
        }
    })
    status: OrderStatus;

    @Prop({ type: OrderCopoun })
    copoun: OrderCopoun;

    @Prop({ type: Number, required: true })
    totalAmount: number;
}

export const orderSchema = SchemaFactory.createForClass(Order)