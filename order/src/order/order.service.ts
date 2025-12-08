import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { appConstants } from 'src/constants';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: appConstants.RMQ_EXCHANGE,
    routingKey: 'gateway.order.created',
    queue: appConstants.RMQ_GATEWAY_QUEUE,
  })
  createOrder(payload: CreateOrderDto) {
    // optionally save to db
    // this.orderRepository.save(payload);

    void this.amqpConnection.publish(
      appConstants.RMQ_EXCHANGE,
      'order.created',
      payload,
    );
  }
}
