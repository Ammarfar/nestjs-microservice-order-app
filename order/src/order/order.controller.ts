import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Body() body: CreateOrderDto) {
    this.orderService.createOrder(body);

    return 'Order has been created!';
  }
}
