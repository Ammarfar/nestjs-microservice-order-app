import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { appConstants } from 'src/constants';
import { UpdatedInventoryDto } from './dto/updated-inventory.dto';

@Injectable()
export class NotificationService {
  @RabbitSubscribe({
    exchange: appConstants.RMQ_EXCHANGE,
    routingKey: 'inventory.updated',
    queue: appConstants.RMQ_INVENTORY_QUEUE,
  })
  logUpdatedInventory(payload: UpdatedInventoryDto) {
    console.log(
      `Order successfully processed for user: ${payload.userId}, item: ${payload.itemId} with current stock: ${payload.stock} `,
    );
  }
}
