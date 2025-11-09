import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./product.schema";
import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
        super(productModel)
    }
    
}