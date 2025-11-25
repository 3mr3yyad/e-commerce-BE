import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth, MESSAGE, User } from '@/common';

@Controller('order')
@Auth(['Customer', 'Admin'])
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @User() user: any) {
    const result = await this.orderService.create(createOrderDto, user)
    if (result instanceof Array) {
      return {
        success: false,
        message: "failed to order",
        data: result
      }
    }
    return {
      success: true,
      message: MESSAGE.order.created,
      data: result
    }
  }
}
