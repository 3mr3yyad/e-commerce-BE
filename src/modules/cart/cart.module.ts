import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '../product/product.module';
import { Cart, CartRepository, cartSchema } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@/shared';

@Module({
  imports: [
    ProductModule,
    UserMongoModule,
    MongooseModule.forFeature([{name: Cart.name, schema: cartSchema}])
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository, JwtService],
  exports: [CartService]
})
export class CartModule {}
