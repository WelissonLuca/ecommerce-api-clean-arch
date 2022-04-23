import { Coupon } from "./Coupon";
import { CPF } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

export class Order {
	cpf: CPF;
	orderItems: OrderItem[];
	coupon?: Coupon;
	constructor(cpf: string, readonly date: Date = new Date()) {
		this.cpf = new CPF(cpf);
		this.orderItems = [];
	}

	addItem(item: Item, quantity: number): void {
		this.orderItems.push(new OrderItem(item.id, item.price, quantity));
	}

	addCoupon(coupon: Coupon) {
		if (coupon.isExpired(this.date)) return;
		this.coupon = coupon;
	}

	getTotal(): number {
		let total = 0;
		for (const orderItem of this.orderItems) {
			total += orderItem.getTotal();
		}

		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total, this.date);
		}

		return total;
	}
}
