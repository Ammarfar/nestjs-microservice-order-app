import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class OrderController {
  constructor(
    @Inject('INVENTORY_SERVICE') private inventoryService: ClientProxy,
  ) {}

  @EventPattern('gateway.order.created')
  handleCheckInventory(@Payload() payload: CreateOrderDto) {
    this.inventoryService.emit('order.created', payload);
  }
}
