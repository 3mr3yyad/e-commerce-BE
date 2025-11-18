import { forwardRef, Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactoryService } from './factory';
import { Brand, BrandRepository, BrandSchema } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@/shared';
import { JwtService } from '@nestjs/jwt';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
    ]),
    forwardRef(() => ProductModule),
  ],
  controllers: [BrandController],

  providers: [
    BrandService,
    BrandFactoryService,
    BrandRepository,
    JwtService
  ],
  exports: [
    BrandService,
    BrandFactoryService,
    BrandRepository
  ]
})
export class BrandModule { }
