import { OrderCode } from "./OrderCode";
import { DefaultFreightCalculator } from "./DefaultFreightCalculator";
import { FreightCalculator } from "./FreightCalculator";
import { Coupon } from "./Coupon";
import { CPF } from "./Cpf";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

export class Order {
	cpf: CPF;
	orderItems: OrderItem[];
	coupon?: Coupon;
	private freight: number;
	code: OrderCode;
	constructor(
		cpf: string,
		readonly date: Date = new Date(),
		readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
		readonly sequence: number = 1
	) {
		this.cpf = new CPF(cpf);
		this.orderItems = [];
		this.freight = 0;
		this.code = new OrderCode(date, sequence);
	}

	addItem(item: Item, quantity: number): void {
		this.freight += Number(this.freightCalculator.calculate(item) * quantity);

		this.orderItems.push(new OrderItem(item.id, item.price, quantity));
	}

	addCoupon(coupon: Coupon) {
		if (coupon.isExpired(this.date)) return;
		this.coupon = coupon;
	}

	getFreight(): number {
		return this.freight;
	}

	getTotal(): number {
		let total = 0;
		for (const orderItem of this.orderItems) {
			total += orderItem.getTotal();
		}

		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total, this.date);
		}

		total += this.getFreight();
		return total;
	}

	getCode(): string {
		return this.code.value;
	}
}
