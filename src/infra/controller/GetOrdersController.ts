import { GetOrders } from "../../application/query/get_orders/GetOrders";
import { RepositoryFactory } from "../../domain/factories/RepositoryFactory";
import { Connection } from "../database/Connection";

export class GetOrdersController {
	constructor(readonly connection: Connection) {}
	async execute(params: any, body: any) {
		const getOrders = new GetOrders(this.connection);
		return getOrders.execute();
	}
}