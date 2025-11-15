import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/models';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '../category/category.service';
import { Product } from './entities/product.entity';
import { MESSAGE } from '@/common';
import { BrandService } from '../brand/brand.service';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService
  ) { }
  async create(product: Product, user: any) {
    await this.categoryService.findOne(product.categoryId);
    await this.brandService.findOne(product.brandId);

    const productExists = await this.productRepository.getOne(
      {
        slug: product.slug,
        $or: [{ createdby: user._id }, { updatedby: user._id }]
      });
    if (productExists) {
      return await this.update(productExists._id, product);
    }

    return await this.productRepository.create(product);
  }

  async findAll() {
    const products = await this.productRepository.getMany({}, {}, { populate: [{ path: 'category' }, { path: 'brand' }] });
    if (!products) {
      throw new NotFoundException(MESSAGE.product.notFound);
    }
    return products;
  }

  async findOne(id: string) {
    const product = await this.productRepository.getOne({ _id: id }, {}, { populate: [{ path: 'category' }, { path: 'brand' }] });
    if (!product) {
      throw new NotFoundException(MESSAGE.product.notFound);
    }
    return product;
  }

  async update(id: string | Types.ObjectId, product: Product) {
    const productExists = await this.productRepository.getOne({ _id: id });
    if (!productExists) {
      throw new NotFoundException(MESSAGE.product.notFound);
    }

    product.stock += productExists.stock;

    const colors = new Set<string>(productExists.colors);
    for (const color of product.colors) {
      colors.add(color);
    }
    product.colors = Array.from(colors);

    const sizes = new Set<string>(productExists.sizes);
    for (const size of product.sizes) {
      sizes.add(size);
    }
    product.sizes = Array.from(sizes);

    return await this.productRepository.updateOne({ _id: id }, product, { new: true });
  }

  // remove(id: string) {
  //   return this.productRepository.deleteOne({ _id: id });
  // }
}
