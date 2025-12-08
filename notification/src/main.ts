import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConstants } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(appConstants.APP_PORT);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
