import { Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductService } from '../product/product.service';
import { CartRepository } from '@/models';
import { ObjectId } from 'mongoose';

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
      cart.products[index].quantity = addToCartDto.quantity
    }

    await cart.save()
    return cart
  }

  // findAll() {
  //   return `This action returns all cart`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} cart`;
  // }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cart`;
  // }
}
