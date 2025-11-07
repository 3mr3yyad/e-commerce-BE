import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Category {
    readonly _id: Types.ObjectId;

    @Prop({type: String, required: true, unique: true, trim: true })
    name: string;

    @Prop({type: String, required: true, unique: true, trim: true })
    slug: string;

    @Prop({type: Types.ObjectId, required: true, ref: 'Admin'})
    createdby: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Admin'})
    updatedby: Types.ObjectId;

    logo?: Object; // todo
}

export const CategorySchema = SchemaFactory.createForClass(Category);