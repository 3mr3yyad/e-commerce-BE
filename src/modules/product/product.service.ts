import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/models';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from '../category/category.service';
import { Product } from './entities/product.entity';
import { MESSAGE } from '@/common';
import { BrandService } from '../brand/brand.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService
  ) { }
  async create(product: Product) {
    await this.categoryService.findOne(product.categoryId);
    await this.brandService.findOne(product.brandId);

    return this.productRepository.create(product);
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

  // async update(id: string, product: Product) {
  //   const productExists = await this.productRepository.getOne({ _id: id }, {}, { populate: [{ path: 'category' }, { path: 'brand' }] });
  //   if (!productExists) {
  //     throw new NotFoundException(MESSAGE.product.notFound);
  //   }
  //   return this.productRepository.updateOne({ _id: id }, product, { new: true });
  // }

  // remove(id: string) {
  //   return this.productRepository.deleteOne({ _id: id });
  // }
}
