import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('INVENTORY_SERVICE') private inventoryService: ClientProxy,
  ) {}

  createOrder(payload: CreateOrderDto) {
    // optionally save to db
    // this.orderRepository.save(payload);

    this.inventoryService.emit('order.created', payload);
  }
}
