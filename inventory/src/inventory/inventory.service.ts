import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

export type Inventory = {
  itemId: number;
  itemName: string;
  stock: number;
};

@Injectable()
export class InventoryService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
  ) {}

  private readonly inventories: Inventory[] = [
    {
      itemId: 1,
      itemName: 'Item 1',
      stock: 10,
    },
    {
      itemId: 2,
      itemName: 'Item 2',
      stock: 5,
    },
  ];

  createOrder(payload: CreateOrderDto): void {
    try {
      // get item and deduct stock if available
      const item = this.getAvailableItem(payload.itemId, payload.quantity);
      item.stock -= payload.quantity;

      // publish inventory.updated event
      this.notificationService.emit('inventory.updated', {
        ...item,
        userId: payload.userId,
      });
    } catch (error) {
      // publish inventory.failed event

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log('error: ', error.message);
    }
  }

  private getAvailableItem(itemId: number, quantity: number): Inventory {
    const item = this.inventories.find((item) => item.itemId === itemId);

    if (!item) {
      throw new Error(`item not found`);
    } else if (item.stock < quantity) {
      throw new Error(
        `only ${item.stock} stock available for item: ${item.itemName}`,
      );
    }

    return item;
  }
}
