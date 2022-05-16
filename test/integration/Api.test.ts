import axios from "axios";
import { PlaceOrder } from "../../src/application/useCases/place_order/PlaceOrder";
import { Connection } from "../../src/infra/database/Connection";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factories/DatabaseRepositoryFactory ";


let placeOrder: PlaceOrder;
let connection: Connection;
describe("Api", () => {
	beforeEach(() => {
		connection = PgPromiseConnectionAdapter.getInstance();
		const repositoryFactory = new DatabaseRepositoryFactory();
		placeOrder = new PlaceOrder(repositoryFactory);
	});

	afterEach(async () => {
		await connection.query("delete from ccca.order", []);
		await connection.query("delete from ccca.order_item", []);
	});
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

	describe("GetOrders", () => { 
		it("should be get orders", async () => {
				const input = {
					cpf: "606.915.690-02",
					orderItems: [
						{ idItem: 1, quantity: 1 },
						{ idItem: 2, quantity: 1 },
						{ idItem: 3, quantity: 3 },
					],
					date: new Date(),
					coupon: "VALE20",
				};

				await placeOrder.execute(input);
			const response = await axios({
				url: "http://localhost:3000/orders/",
				method: "get",
			});

			const output = response.data;
			expect(output.orders).toHaveLength(1);
		});
	});
});
