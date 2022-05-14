import axios from "axios";
describe("Api", () => {
	describe("PlaceOrder", () => {
		it("should be to create a new order", async () => {
			const response = await axios({
				url: "http://localhost:3000/orders/",
				method: "post",
				data: {
					cpf: "606.915.690-02",
					orderItems: [
						{ idItem: 1, quantity: 1 },
						{ idItem: 2, quantity: 1 },
						{ idItem: 3, quantity: 3 },
					],
					date: new Date(),
					coupon: "VALE20",
				},
			});

			const order = response.data;
			expect(order.total).toBe(138);
		});
	});

	describe("SimulateFreigth", () => {
		it("should be simulate freigth", async () => {
			const response = await axios({
				url: "http://localhost:3000/simulateFreigth/",
				method: "post",
				data: {
					items: [
						{ idItem: 4, quantity: 1 },
						{ idItem: 5, quantity: 1 },
						{ idItem: 6, quantity: 3 },
					],
				},
			});

			const output = response.data;
			expect(output.amount).toBe(260);
		});
	});
});
