import { Types } from "mongoose";

export class Category {
    readonly _id: Types.ObjectId;
    name: string;
    slug: string;
    createdby: Types.ObjectId;
    updatedby?: Types.ObjectId;
    logo?: Object;
}
