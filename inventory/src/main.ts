import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { appConstants } from './constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [appConstants.RMQ_URL],
      queue: appConstants.RMQ_INVENTORY_QUEUE,
    },
  });

  await app.listen();
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
