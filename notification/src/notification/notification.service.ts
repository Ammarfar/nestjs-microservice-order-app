import { Injectable } from '@nestjs/common';
import { UpdatedInventoryDto } from './dto/updated-inventory.dto';

@Injectable()
export class NotificationService {
  logUpdatedInventory(payload: UpdatedInventoryDto) {
    console.log(
      `Order successfully processed for user: ${payload.userId}, item: ${payload.itemId} with current stock: ${payload.stock} `,
    );
  }
}
