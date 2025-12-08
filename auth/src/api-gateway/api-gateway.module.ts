import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { appConstants } from 'src/constants';
import { OrderController } from './order/order.controller';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: appConstants.RMQ_EXCHANGE,
          type: 'direct',
        },
      ],
      uri: appConstants.RMQ_URL,
      queues: [
        {
          name: appConstants.RMQ_GATEWAY_QUEUE,
          exchange: appConstants.RMQ_EXCHANGE,
          routingKey: ['gateway.order.created'],
        },
      ],
    }),
  ],
  controllers: [OrderController],
})
export class ApiGatewayModule {}
