import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '../product/product.module';
import { Cart, CartRepository, cartSchema } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([{name: Cart.name, schema: cartSchema}])
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
