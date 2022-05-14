
import { PlaceOrderController } from './../controller/PlaceOrderController';
import { SimulateFreigth } from "../../application/useCases/simulate_freigth/SimulateFreigth";
import { DefaultFreightCalculator } from "../../domain/entities/DefaultFreightCalculator";
import { PgPromiseConnectionAdapter } from "../database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "../factories/DatabaseRepositoryFactory ";
import { ItemRepositoryDatabase } from "../repositories/database/ItemRepositoryDatabase";
import { Http } from "./http";
import { RepositoryFactory } from '../../domain/factories/RepositoryFactory';

export class RouteConfig {
	constructor(http: Http, readonly repositoryFactory: RepositoryFactory) {
		http.on("/orders", "post", async (params: any, body: any) => {
      const placeOrderController = new PlaceOrderController(
				this.repositoryFactory
			);

      return placeOrderController.execute(params, body)
		});

		http.on("/simulateFreigth", "post", async (params: any, body: any) => {
			const simulateFreigth = new SimulateFreigth(
				new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()),
				new DefaultFreightCalculator()
			);
			const input = body;
			return simulateFreigth.execute(input);
		});
	}
}
