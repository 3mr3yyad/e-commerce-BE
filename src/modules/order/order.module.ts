import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from '../cart/cart.module';
import { Order, OrderRepository, orderSchema } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { UserMongoModule } from '@/shared';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule,
    CartModule,
    ProductModule,
    MongooseModule.forFeature([
      {name: Order.name, schema: orderSchema}
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, JwtService],
})
export class OrderModule {}
