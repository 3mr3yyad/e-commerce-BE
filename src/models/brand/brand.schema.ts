import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class Brand {
    readonly _id: Types.ObjectId;

    @Prop({type:String, required:true, unique:true, trim:true})
    name: string;

    @Prop({type:String, required:true, unique:true, lowercase:true, trim:true})
    slug: string;

    @Prop({type:SchemaTypes.ObjectId, required:true, ref:'Admin'})
    createdby: Types.ObjectId;

    @Prop({type:SchemaTypes.ObjectId, ref:'Admin'})
    updatedby: Types.ObjectId;

    @Prop({type: Boolean, default: false})
    deleted: boolean;

    logo: Object; // todo

}

export const BrandSchema = SchemaFactory.createForClass(Brand);
