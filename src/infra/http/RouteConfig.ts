import { OrderDao } from './../../application/dao/OrderDao';
import { PlaceOrderController } from "./../controller/PlaceOrderController";
import { SimulateFreigth } from "../../application/useCases/simulate_freigth/SimulateFreigth";
import { DefaultFreightCalculator } from "../../domain/entities/DefaultFreightCalculator";
import { PgPromiseConnectionAdapter } from "../database/PgPromiseConnectionAdapter";
import { ItemRepositoryDatabase } from "../repositories/database/ItemRepositoryDatabase";
import { Http } from "./http";
import { RepositoryFactory } from "../../domain/factories/RepositoryFactory";
import { GetOrdersController } from "../controller/GetOrdersController";
import { GetOrderController } from "../controller/GetOrderController";
import { Connection } from "../database/Connection";

export class RouteConfig {
	constructor(
		http: Http,
		readonly repositoryFactory: RepositoryFactory,
		readonly orderDao: OrderDao
	) {
		http.on("/orders", "post", async (params: any, body: any) => {
			const placeOrderController = new PlaceOrderController(
				this.repositoryFactory
			);

			return placeOrderController.execute(params, body);
		});

		http.on("/simulateFreigth", "post", async (params: any, body: any) => {
			const simulateFreigth = new SimulateFreigth(
				new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()),
				new DefaultFreightCalculator()
			);
			const input = body;
			return simulateFreigth.execute(input);
		});

		http.on("/orders", "get", async (params: any, body: any) => {
			const getOrdersController = new GetOrdersController(this.orderDao);
			return getOrdersController.execute(params, body);
		});

		http.on("/orders/:code", "get", async (params: any, body: any) => {
			const getOrderController = new GetOrderController(this.orderDao);
			return getOrderController.execute(params, body);
		});
	}
}
