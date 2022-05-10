import { DatabaseRepositoryFactory } from "./../../src/infra/factories/DatabaseRepositoryFactory ";
import { ItemRepositoryDatabase } from "../../src/infra/repositories/database/ItemRepositoryDatabase";
import { CouponRepositoryMemory } from "../../src/infra/repositories/memory/CouponRepositoryMemory";
import { PlaceOrder } from "../../src/application/useCases/place_order/PlaceOrder";
import { OrderRepositoryMemory } from "../../src/infra/repositories/memory/OrderRepositoryMemory";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import { CouponRepositoryDatabase } from "../../src/infra/repositories/database/CouponRepositoryDatabase";
import { OrderRepositoryDatabase } from "../../src/infra/repositories/database/OrderRepositoryDatabase";
import { Connection } from "../../src/infra/database/Connection";

let placeOrder: PlaceOrder;
let connection: Connection;

describe("PlaceOrder", () => {
	beforeEach(() => {
		connection = PgPromiseConnectionAdapter.getInstance();
		const repositoryFactory = new DatabaseRepositoryFactory();
		placeOrder = new PlaceOrder(repositoryFactory);
	});

	afterEach(async () => {
		await connection.query("delete from ccca.order", []);
		await connection.query("delete from ccca.order_item", []);
	});
	it("should be a place order", async () => {
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

		const output = await placeOrder.execute(input);

		expect(output.total).toBe(138);
	});

	it("should be a place order with freight calculate", async () => {
		const input = {
			cpf: "839.435.452-10",
			orderItems: [
				{ idItem: 4, quantity: 1 },
				{ idItem: 5, quantity: 1 },
				{ idItem: 6, quantity: 3 },
			],
			date: new Date("2021-12-10"),
		};
		const output = await placeOrder.execute(input);
		expect(output.total).toBe(6350);
	});

	it("should be a place order with code", async () => {
		const input = {
			cpf: "606.915.690-02",
			orderItems: [
				{ idItem: 1, quantity: 1 },
				{ idItem: 2, quantity: 1 },
				{ idItem: 3, quantity: 3 },
			],
			date: new Date(),
		};

		const output = await placeOrder.execute(input);

		expect(output.code).toBe("202200000001");
	});
});
