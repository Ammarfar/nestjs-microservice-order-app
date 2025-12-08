import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { appConstants } from 'src/constants';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: appConstants.RMQ_URL,
    }),
  ],
  providers: [NotificationService],
})
export class NotificationModule {}
