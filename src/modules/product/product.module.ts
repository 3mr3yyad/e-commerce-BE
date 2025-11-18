import { forwardRef, Module } from '@nestjs/common';
import { UserMongoModule } from 'src/shared';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { JwtService } from '@nestjs/jwt';
import { ProductFactoryService } from './factory';
import { Product, ProductRepository, ProductSchema } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports:[
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
    forwardRef(() => CategoryModule),
    BrandModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    ProductFactoryService,
    JwtService
  ],
  exports: [
    ProductService,
    ProductRepository,
    ProductFactoryService
  ]
})
export class ProductModule {}
