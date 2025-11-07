import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategoryRepository, CategorySchema } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@/shared';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService,
    CategoryRepository,
    CategoryFactoryService,
    JwtService
  ],
})
export class CategoryModule {}
