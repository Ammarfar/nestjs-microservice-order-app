import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConstants } from './constants';
import { LogInterceptor } from './interceptors/log.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validator
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Transaction Order Application')
    .setDescription('NestJS microservice application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  // global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor(), new LogInterceptor());

  // API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(appConstants.APP_PORT);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
