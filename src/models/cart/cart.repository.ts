import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Cart } from "./cart.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CartRepository extends AbstractRepository<Cart> {
    constructor(@InjectModel(Cart.name) private readonly cartModel: Model<Cart>) {
        super(cartModel);
    }
}