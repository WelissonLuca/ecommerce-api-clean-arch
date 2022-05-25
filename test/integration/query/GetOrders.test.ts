import { DatabaseRepositoryFactory } from "../../../src/infra/factories/DatabaseRepositoryFactory ";
import { PlaceOrder } from "../../../src/application/useCases/place_order/PlaceOrder";
import { PgPromiseConnectionAdapter } from "../../../src/infra/database/PgPromiseConnectionAdapter";
import { Connection } from "../../../src/infra/database/Connection";
import { GetOrders } from "../../../src/application/query/get_orders/GetOrders";
import { OrderDao } from "../../../src/application/dao/OrderDao";
import { OrderDaoDatabase } from "../../../src/infra/dao/OrderDaoDatabase";

let placeOrder: PlaceOrder;
let getOrders: GetOrders;
let connection: Connection;
let orderDao: OrderDao;

describe("GetOrders", () => {
	beforeEach(() => {
		connection = PgPromiseConnectionAdapter.getInstance();
		const repositoryFactory = new DatabaseRepositoryFactory();
		placeOrder = new PlaceOrder(repositoryFactory);
		orderDao = new OrderDaoDatabase(connection);
		getOrders = new GetOrders(orderDao);
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

		await placeOrder.execute(input);
		const getOrdersOutput = await getOrders.execute();
		expect(getOrdersOutput.orders).toHaveLength(1);
	});
});
