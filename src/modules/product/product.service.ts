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

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
