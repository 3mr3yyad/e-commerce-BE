import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Category } from "./category.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CategoryRepository extends AbstractRepository<Category> {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {
        super(categoryModel);
    }
}