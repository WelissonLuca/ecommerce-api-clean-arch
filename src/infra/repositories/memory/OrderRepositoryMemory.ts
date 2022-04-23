import { Order } from './../../../domain/entities/Order';
import { OrderRepository } from './../../../domain/repositories/OrderRepository';

export class OrderRepositoryMemory implements OrderRepository {
  orders: Order[] = [];
  constructor() {}
  save(order: Order): Promise<void> {
    this.orders.push(order);
    return Promise.resolve();
  }

}