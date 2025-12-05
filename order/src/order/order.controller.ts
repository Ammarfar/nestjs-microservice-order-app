import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @EventPattern('gateway.order.created')
  createOrder(@Payload() payload: CreateOrderDto) {
    this.orderService.createOrder(payload);
  }
}
