import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Order } from "./order.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class OrderRepository extends AbstractRepository<Order> {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {
        super(orderModel);
    }
}