import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true,
    discriminatorKey: 'role',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class Customer{
    readonly _id: Types.ObjectId;
    readonly role: string;
    userName:string;
    email:string;
    @Prop({type:String,required:function(){return this.googleLogin ? false : true}})
    password?: string;
    otp: string;
    otpExpiry: Date;
    isVerified: boolean;
    @Prop({type:Date})
    dob: Date;
    @Prop({type:String})
    address:string;
    @Prop({type:String})
    phoneNumber: string;
    @Prop({type:Boolean, default:false})
    googleLogin: boolean;
}

export const customerSchema = SchemaFactory.createForClass(Customer);