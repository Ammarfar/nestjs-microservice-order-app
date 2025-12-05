import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @EventPattern('order.created')
  createOrder(@Payload() payload: CreateOrderDto) {
    this.inventoryService.createOrder(payload);
  }
}
