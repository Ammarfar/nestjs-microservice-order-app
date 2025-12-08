import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { appConstants } from 'src/constants';
import { OrderService } from './order.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: appConstants.RMQ_URL,
      queues: [
        {
          name: appConstants.RMQ_ORDER_QUEUE,
          exchange: appConstants.RMQ_EXCHANGE,
          routingKey: ['order.created'],
        },
      ],
    }),
  ],
  providers: [OrderService],
})
export class OrderModule {}
