import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/auth.guard';
import { appConstants } from 'src/constants';
import { User } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrderController {
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @Throttle({ default: { limit: 1, ttl: 2000 } })
  async createOrder(@Body() body: CreateOrderDto, @Req() req: { user: User }) {
    const orderFetch = await fetch(`${appConstants.ORDER_APP_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        userId: req.user.userId,
      }),
    });

    return await orderFetch.text();
  }
}
