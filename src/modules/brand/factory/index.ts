import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { Brand } from "../entities/brand.entity";
import slugify from "slugify";
import { UpdateBrandDto } from "../dto/update-brand.dto";

@Injectable()
export class BrandFactoryService {
    constructor() {}
    createBrand(createBrandDto: CreateBrandDto, user: any) {
        const brand = new Brand();
        brand.name = createBrandDto.name;
        brand.slug = slugify(createBrandDto.name, { lower: true });
        brand.createdby = user._id;
        brand.updatedby = user._id;
        brand.logo = createBrandDto.logo;

        return brand;
    }

    updateBrand(id: string, updateBrandDto: UpdateBrandDto, user: any) {
        const brand = new Brand();
        brand.name = updateBrandDto.name || brand.name;
        brand.slug = slugify(updateBrandDto.name || brand.name, { lower: true });
        brand.logo = updateBrandDto.logo || brand.logo;
        brand.updatedby = user._id;
        return brand;
    }
}
