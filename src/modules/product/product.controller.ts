import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth, MESSAGE, Public, User } from '@/common';
import { ProductFactoryService } from './factory';

@Controller('product')
@Auth(['Admin', 'Seller'])
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productFactory: ProductFactoryService
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @User() user: any) {
    const product = this.productFactory.createProduct(createProductDto, user);
    const createdProduct = await this.productService.create(product);
    return {
      success: true,
      message: MESSAGE.product.created,
      data: createdProduct
    }
  }

  @Public()
  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return {
      success: true,
      message: "Products fetched successfully",
      data: products
    }
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return {
      success: true,
      message: "Product fetched successfully",
      data: product
    }
  }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   const product = this.productFactory.updateProduct(id, updateProductDto);
  //   const updatedProduct = await this.productService.update(id, product);
  //   return {
  //     success: true,
  //     message: "Product updated successfully",
  //     data: updatedProduct
  //   }
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   const deletedProduct = await this.productService.remove(id);
  //   return {
  //     success: true,
  //     message: "Product deleted successfully",
  //     data: deletedProduct
  //   }
  // }
}
