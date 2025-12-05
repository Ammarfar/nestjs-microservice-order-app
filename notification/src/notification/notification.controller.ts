import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UpdatedInventoryDto } from './dto/updated-inventory.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('inventory.updated')
  logUpdatedInventory(@Payload() payload: UpdatedInventoryDto) {
    this.notificationService.logUpdatedInventory(payload);
  }
}
