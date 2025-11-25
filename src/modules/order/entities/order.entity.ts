import { DiscountType, OrderStatus, PaymentMethod } from "@/common";
import { Types } from "mongoose";

export class OrderAdress {
    details: string;
    street: string;
    city: string;
    state: string;
    govrnate: string;
    country: string;
    phoneNumber: string
}

export class OrderProduct {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    discount: number;
    totalPrice: number;
}


export class OrderCopoun {
    copounId: Types.ObjectId;
    code: string;
    discountAmount: number;
    discountType: DiscountType;
}

export class Order {
    readonly _id: Types.ObjectId;
    userId: Types.ObjectId;
    address: OrderAdress;
    products: OrderProduct[];
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    copoun: OrderCopoun;
    totalAmount: number;
}