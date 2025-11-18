import { CategoryRepository } from "@/models";
import { Injectable, NotFoundException } from "@nestjs/common";
import slugify from "slugify";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryFactoryService {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) { }
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
        category.deleted = false;
        return category;
    }

    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto, user: any) {
        const oldCategory = await this.categoryRepository.getOne({ _id: id });
        if (!oldCategory) {
            throw new NotFoundException('Category not found');
        }
        const category = new Category();
        category.name = updateCategoryDto.name || oldCategory.name;
        category.slug = slugify(updateCategoryDto.name || oldCategory.name, {
            lower: true,
            trim: true,
            replacement: '-'
        });
        category.logo = updateCategoryDto.logo || oldCategory.logo;
        category.updatedby = user._id;
        category.deleted = false;
        return category;
    }
}