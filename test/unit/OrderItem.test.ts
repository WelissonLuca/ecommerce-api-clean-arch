import { OrderItem } from "../../src/domain/entities/OrderItem";

describe("OrderItem", () => {
	it("should create an item of request", () => {
		const orderItem = new OrderItem(1, 1000, 3);
		expect(orderItem.getTotal()).toBe(3000);
	});
});
