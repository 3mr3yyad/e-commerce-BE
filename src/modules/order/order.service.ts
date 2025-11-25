import { DiscountType, MESSAGE } from '@/common';
import { OrderRepository, ProductRepository } from '@/models';
import { ConflictException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly cartService: CartService,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) { }
  async create(createOrderDto: CreateOrderDto, user:any) {
    const cart = await this.cartService.findOne(user)

    if (cart.products.length == 0) {
      throw new ConflictException('cart is empty')
    }

    const successedProducts: {
      productId: Types.ObjectId;
      quantity: number;
      price: number;
      discountAmount: number;
      discountType: DiscountType;
      totalPrice:number;

    }[] = []

    const failedProducts: { productId: string | Types.ObjectId;  reason: string }[] = []

    for (const product of cart.products) {
      const productExist = await this.productRepository.getOne({
        _id: product.productId
      })
      if (!productExist) {
        failedProducts.push({
          productId: product.productId,
          reason: MESSAGE.product.notFound
        })
        continue;
      }
      if (productExist?.stock < product.quantity) {
        failedProducts.push({
          productId: product.productId,
          reason: 'product stock is not enough'
        })
        continue;
      }
      successedProducts.push({
        productId: product.productId,
        quantity: product.quantity,
        price: productExist.finalPrice,
        discountAmount: productExist.discountAmount,
        discountType: productExist.discountType,
        totalPrice: productExist.finalPrice * product.quantity
      })
    }
    if(failedProducts.length > 0){
      return failedProducts
    }

    const order = await this.orderRepository.create({
      userId: user._id,
      address: createOrderDto.address,
      products: successedProducts,
      paymentMethod: createOrderDto.paymentMethod,
      copoun: createOrderDto.copoun,
      totalAmount: successedProducts.reduce(
        (total, product) => total + (product.price * product.quantity),
        0
      )
    })

    await this.cartService.clearCart(user)

    return order

  }
}
