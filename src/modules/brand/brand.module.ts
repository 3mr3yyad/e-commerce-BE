import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { BrandFactoryService } from './factory';
import { Brand, BrandRepository, BrandSchema } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoModule } from '@/shared';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Brand.name, schema: BrandSchema },
    ]),
  ],
  controllers: [BrandController],

  providers: [
    BrandService,
    BrandFactoryService,
    BrandRepository,
    JwtService
  ],
})
export class BrandModule { }
