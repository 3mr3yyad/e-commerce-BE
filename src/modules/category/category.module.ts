import { Category, CategoryRepository, CategorySchema } from '@/models';
import { UserMongoModule } from '@/shared';
import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryFactoryService } from './factory';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
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
