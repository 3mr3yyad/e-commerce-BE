import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
    timestamps: true,
    discriminatorKey: 'role',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
export class Admin{
    readonly _id: Types.ObjectId;
    @Prop({type:String,required:true})
    password?: string;
    userName:string;
    email:string;

}

export const adminSchema = SchemaFactory.createForClass(Admin);
