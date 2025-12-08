import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { appConstants } from 'src/constants';
import { InventoryService } from './inventory.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: appConstants.RMQ_URL,
      queues: [
        {
          name: appConstants.RMQ_INVENTORY_QUEUE,
          exchange: appConstants.RMQ_EXCHANGE,
          routingKey: ['inventory.updated'],
        },
      ],
    }),
  ],
  providers: [InventoryService],
})
export class InventoryModule {}
