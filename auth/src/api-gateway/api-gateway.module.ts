import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { appConstants } from 'src/constants';
import { OrderController } from './order/order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [appConstants.RMQ_URL],
          queue: appConstants.RMQ_ORDER_QUEUE,
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class ApiGatewayModule {}
