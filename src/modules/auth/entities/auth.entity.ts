import { Types } from "mongoose";

export class Customer {
    readonly _id: Types.ObjectId;
    readonly role: string;
    userName: string;
    email: string;
    password: string;
    otp: string;
    otpExpiry: Date;
    isVerified: boolean;
    dob?: Date;
    address?: string;
    phoneNumber?: string;
    googleLogin?: boolean;
}
