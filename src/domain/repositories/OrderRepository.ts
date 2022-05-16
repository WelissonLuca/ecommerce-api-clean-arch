import { Order } from "../entities/Order";

export interface OrderRepository {
	save(order: Order): Promise<void>;
	get: (code: string) => Promise<Order>;
	count(): Promise<number>;
}
