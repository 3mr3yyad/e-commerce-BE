import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategoryRepository, CategorySchema, ProductRepository } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@/shared';
import { ProductModule } from '../product/product.module';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    BrandModule,
    forwardRef(() => ProductModule),
    
  ],
  controllers: [CategoryController],
  providers: [CategoryService,
    CategoryRepository,
    CategoryFactoryService,
    JwtService
  ],
  exports: [
    CategoryService,
    CategoryRepository,
    CategoryFactoryService
  ]
})
export class CategoryModule {}
