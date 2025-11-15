import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { Coupon } from "./coupon.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CouponRepository extends AbstractRepository<Coupon> {
    constructor(@InjectModel(Coupon.name) couponModel: Model<Coupon>) {
        super(couponModel)
    }
}