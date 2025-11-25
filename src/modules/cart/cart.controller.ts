import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth, MESSAGE, User } from '@/common';

@Controller('cart')
@Auth(['Admin', 'Customer'])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto, @User()user:any) {
    const cart = this.cartService.addToCart(addToCartDto, user);
    return {
      success: true,
      message: MESSAGE.cart.updated,
      data: cart
    }
  }

  @Get()
  findOne(@User()user:any) {
    const cart = this.cartService.findOne(user);
    return {
      success: true,
      data: cart
    }
  }

  @Put('remove/:productId')
  removeFromCart(@Param('productId') productId: string, @User()user:any) {
    const cart = this.cartService.removeFromCart(productId, user);
    return {
      success: true,
      message: MESSAGE.cart.updated,
      data: cart
    }
  }

  @Delete()
  async clearCart(@User()user:any) {
    await this.cartService.clearCart(user);
    return {
      success: true,
      message: MESSAGE.cart.deleted,
    }
  }
}
