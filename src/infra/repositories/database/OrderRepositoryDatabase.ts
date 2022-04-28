import { Order } from "../../../domain/entities/Order";
import { Connection } from "../../database/Connection";
import { OrderRepository } from "./../../../domain/repositories/OrderRepository";

export class OrderRepositoryDatabase implements OrderRepository {
	constructor(readonly connection: Connection) {}
	async save(order: Order): Promise<void> {
		const [orderData] = await this.connection.query(
			"insert into ccca.order (id_order, cpf, issue_date, freigth, sequence, coupon) values ($1, $2, $3, $4, $5, $6) returning *",
			[
				order.getCode(),
				order.getCpf(),
				order.date,
				order.getFreight(),
				order.sequence,
				order.coupon?.name,
			]
		);

		for (const orderItem of order.getOrderItems()) {
			await this.connection.query(
				"insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)",
				[
					orderData.id_order,
					orderItem.idItem,
					orderItem.price,
					orderItem.quantity,
				]
			);
		}
	}
	async count(): Promise<number> {
		const [orderData] = await this.connection.query(
			"select count(*)::int as count from ccca.order",
			[]
		);

		return orderData.count;
	}
}
