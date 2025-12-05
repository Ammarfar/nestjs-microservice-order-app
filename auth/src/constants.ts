export const appConstants = {
  APP_PORT: process.env.APP_PORT ?? 3000,

  JWT_SECRET: process.env.JWT_SECRET ?? 'jwt-secret',

  RMQ_URL: process.env.RMQ_URL ?? 'amqp://localhost:5672',
  RMQ_ORDER_QUEUE: process.env.RMQ_ORDER_QUEUE ?? 'order_queue',
};
