import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
	orders: Order[] = [];
	constructor() {}
	get(code: string): Promise<Order> {
		const order = this.orders.find(o => o.getCode() === code);
		if (!order) {
			throw new Error("Order not found");
		}
		return Promise.resolve(order);
	}
	save(order: Order): Promise<void> {
		this.orders.push(order);
		return Promise.resolve();
	}
	count(): Promise<number> {
		return Promise.resolve(this.orders.length);
	}

	async findAll(): Promise<Order[]> {
		return Promise.resolve(this.orders);
	}
}
