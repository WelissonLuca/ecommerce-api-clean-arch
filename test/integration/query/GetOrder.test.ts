import { DatabaseRepositoryFactory } from "./../../../src/infra/factories/DatabaseRepositoryFactory ";
import { PlaceOrder } from "../../../src/application/useCases/place_order/PlaceOrder";
import { PgPromiseConnectionAdapter } from "../../../src/infra/database/PgPromiseConnectionAdapter";
import { Connection } from "../../../src/infra/database/Connection";
import { GetOrder } from "../../../src/application/query/get_order/GetOrder";

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let connection: Connection;

describe("GetOrder", () => {
	beforeEach(() => {
		connection = PgPromiseConnectionAdapter.getInstance();
		const repositoryFactory = new DatabaseRepositoryFactory();
		placeOrder = new PlaceOrder(repositoryFactory);
		getOrder = new GetOrder(connection);
	});

	afterEach(async () => {
		await connection.query("delete from ccca.order", []);
		await connection.query("delete from ccca.order_item", []);
	});
	it("should be get place order by code", async () => {
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

		const placeOrderOutput = await placeOrder.execute(input);
		const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
		expect(getOrderOutput.code).toBe(placeOrderOutput.code);
		expect(getOrderOutput.total).toBe(138);
	});
});
