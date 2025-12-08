import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
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
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @Throttle({ default: { limit: 1, ttl: 2000 } })
  createOrder(@Body() body: CreateOrderDto, @Req() req: { user: User }) {
    void this.amqpConnection.publish(
      appConstants.RMQ_EXCHANGE,
      'gateway.order.created',
      {
        ...body,
        userId: req.user.userId,
      },
    );

    return 'Order has been created!';
  }
}
