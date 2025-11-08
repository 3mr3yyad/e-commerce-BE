import { Injectable } from "@nestjs/common";
import { Brand } from "./brand.schema";
import { AbstractRepository } from "../abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BrandRepository extends AbstractRepository<Brand> {
    constructor(@InjectModel(Brand.name) private readonly brandModel: Model<Brand>) {
        super(brandModel)
    }
}
