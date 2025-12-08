export const appConstants = {
  APP_PORT: process.env.APP_PORT ?? 3001,

  RMQ_URL: process.env.RMQ_URL ?? 'amqp://localhost:5672',
  RMQ_EXCHANGE: process.env.RMQ_EXCHANGE ?? 'order_app_exchange',
  RMQ_GATEWAY_QUEUE: process.env.RMQ_GATEWAY_QUEUE ?? 'gateway_queue',
  RMQ_ORDER_QUEUE: process.env.RMQ_ORDER_QUEUE ?? 'order_queue',
};
