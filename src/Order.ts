import { DefaultFreightCalculator } from './DefaultFreightCalculator';
import { FreightCalculator } from './FreightCalculator';
import { Coupon } from "./Coupon";
import { CPF } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

export class Order {
	cpf: CPF;
	orderItems: OrderItem[];
	coupon?: Coupon;
	private freigth: number;
	constructor(cpf: string, readonly date: Date = new Date(), readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()) {
		this.cpf = new CPF(cpf);
		this.orderItems = [];
		this.freigth = 0;
	}

	addItem(item: Item, quantity: number): void {
		this.freigth += this.freightCalculator.calculate(item) * quantity;

		this.orderItems.push(new OrderItem(item.id, item.price, quantity));
	}

	addCoupon(coupon: Coupon) {
		if (coupon.isExpired(this.date)) return;
		this.coupon = coupon;
	}

	getFreigth(): number { 
		return this.freigth;
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
