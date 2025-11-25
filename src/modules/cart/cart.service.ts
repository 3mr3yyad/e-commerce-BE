import { MESSAGE } from '@/common';
import { CartRepository } from '@/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,
    private readonly cartRepository: CartRepository
  ) { }

  private async createCart(user:any, addToCartDto: AddToCartDto){
    const newCart = await this.cartRepository.create({
        userId: user._id,
        products: [
          {
            productId: addToCartDto.productId,
            quantity: addToCartDto.quantity
          }
        ]
    })
    return newCart
  }

  async addToCart(addToCartDto: AddToCartDto, user:any) {
    await this.productService.findOne(addToCartDto.productId)
    const cart = await this.cartRepository.getOne({ userId: user.id })

    if (!cart) {
      return await this.createCart(user, addToCartDto)
    }
    const index = cart.products.findIndex(
      (product) => product.productId.equals(addToCartDto.productId)
    )

    if(index == -1){
      cart.products.push({
        productId: addToCartDto.productId,
        quantity: addToCartDto.quantity
      })
    } else {
      if(addToCartDto.quantity = 0){
        await this.removeFromCart(addToCartDto.productId, user)
      } else {
        cart.products[index].quantity = addToCartDto.quantity
      }
    }

    await cart.save()
    return cart
  }

  async findOne(user: any) {
    const cartExist = await this.cartRepository.getOne({ userId: user._id })
    if(!cartExist){
      throw new NotFoundException(MESSAGE.product.notFound)
    }
    return cartExist
  }

  async removeFromCart(productId: string | Types.ObjectId, user:any) {
    const cart = await this.cartRepository.updateOne(
      { userId: user._id, "products.productId": productId },
      { $pull: { products: { productId } } }
    )
    if(!cart){
      throw new NotFoundException(MESSAGE.product.notFound)
    }
    return true
  }

  async clearCart(user:any) {
    await this.cartRepository.updateOne(
      { userId: user._id },
      { $set: { products: [] } }
    )
    return true
  }
}
