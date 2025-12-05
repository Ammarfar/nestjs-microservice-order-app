import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrderController {
  constructor(@Inject('ORDER_SERVICE') private orderService: ClientProxy) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @Throttle({ default: { limit: 1, ttl: 2000 } })
  createOrder(@Body() body: CreateOrderDto, @Req() req: { user: User }) {
    this.orderService.emit('order.created', {
      ...body,
      userId: req.user.userId,
    });

    return 'Order has been created!';
  }
}
