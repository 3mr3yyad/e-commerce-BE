import slugify from "slugify";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";
import { Types } from "mongoose";

export class ProductFactoryService {
    createProduct(createProductDto: CreateProductDto, user: any) {
        const product = new Product();
        product.name = createProductDto.name;
        product.slug = slugify(createProductDto.name);
        product.description = createProductDto.description;

        product.brandId = new Types.ObjectId(createProductDto.brandId);
        product.categoryId = new Types.ObjectId(createProductDto.categoryId);
        product.createdby = user._id;
        product.updatedby = user._id;

        product.price = createProductDto.price;
        product.discountAmount = createProductDto.discountAmount;
        product.discountType = createProductDto.discountType;
        product.stock = createProductDto.stock;
        product.sold = 0;

        product.colors = createProductDto.colors;
        product.sizes = createProductDto.sizes;
        // product.images = createProductDto.images;
        product.deleted = false;
        return product;
    }
}
