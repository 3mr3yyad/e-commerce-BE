import { DiscountType } from "@/common";
import { CouponUser } from "@/models";
import { Types } from "mongoose";

export class Coupon {
    readonly _id: Types.ObjectId;
    code: string;
    discountAmount: number;
    discountType: DiscountType;
    startDate: Date;
    endDate: Date;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    active: boolean;
    usedBy: CouponUser[];
    assignedTo: CouponUser[];
}
