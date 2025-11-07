import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";
import slugify from "slugify";

@Injectable()
export class CategoryFactoryService {
    createCategory(createCategoryDto: CreateCategoryDto, user: any) {
        const category = new Category();
        category.name = createCategoryDto.name;
        category.slug = slugify(createCategoryDto.name, {
            lower: true,
            trim: true,
            replacement: '-'
        });
        category.createdby = user._id;
        category.updatedby = user._id;
        category.logo = createCategoryDto.logo;
        return category;
    }
}