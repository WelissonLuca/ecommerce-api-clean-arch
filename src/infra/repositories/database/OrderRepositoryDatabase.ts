import { Coupon } from './../../../domain/entities/Coupon';
import { Item } from "./../../../domain/entities/Item";
import { DefaultFreightCalculator } from "./../../../domain/entities/DefaultFreightCalculator";
import { Order } from "../../../domain/entities/Order";
import { Connection } from "../../database/Connection";
import { OrderRepository } from "./../../../domain/repositories/OrderRepository";

export class OrderRepositoryDatabase implements OrderRepository {
	constructor(readonly connection: Connection) {}
	async get(code: string): Promise<Order> {
		const [orderData] = await this.connection.query(
			"select * from ccca.order where code = $1",
			[code]
		);
		if (!orderData) {
			throw new Error("Order not found");
		}
		const order = new Order(
			orderData.cpf,
			orderData.issue_date,
			new DefaultFreightCalculator(),
			orderData.sequence
		);
		const orderItemsData = await this.connection.query(
			"select * from ccca.order_item where id_order = $1",
			[orderData.id_order]
		);
		for (const orderItemData of orderItemsData) {
			const [itemData] = await this.connection.query(
				"select * from ccca.item where id_item = $1",
				[orderItemData.id_item]
			);
			const item = new Item(
				itemData.id_item,
				itemData.category,
				itemData.description,
				Number(orderItemData.price),
				{
					width: itemData.width,
					height: itemData.height,
					length: itemData.length,
					weight: itemData.weight,
				}
			);
			order.addItem(item, orderItemData.quantity);
		}
		if (orderData.coupon) {
				const [couponData] = await this.connection.query(
					"select * from ccca.coupon where code = $1",
					[orderData.coupon]
				);
				const coupon = new Coupon(
					couponData.code,
					couponData.percentage,
					couponData.expire_date
				);
			
			order.addCoupon(coupon);
		 }
	
		
		return order;
	}
	async save(order: Order): Promise<void> {
		console.log(order.coupon);
		const [orderData] = await this.connection.query(
			"insert into ccca.order (code, cpf, issue_date, freight, sequence, coupon) values ($1, $2, $3, $4, $5, $6) returning *",
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
