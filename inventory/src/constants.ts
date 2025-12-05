export const appConstants = {
  RMQ_URL: process.env.RMQ_URL ?? 'amqp://localhost:5672',
  RMQ_INVENTORY_QUEUE: process.env.RMQ_INVENTORY_QUEUE ?? 'inventory_queue',
  RMQ_NOTIFICATION_QUEUE:
    process.env.RMQ_NOTIFICATION_QUEUE ?? 'notification_queue',
};
