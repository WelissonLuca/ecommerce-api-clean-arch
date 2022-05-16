import { GetOrders } from "../../application/useCases/get_orders/GetOrders";
import { RepositoryFactory } from "../../domain/factories/RepositoryFactory";

export class GetOrdersController {
	constructor(readonly repositoryFactory: RepositoryFactory) {}
	async execute(params: any, body: any) {
		const placeOrder = new GetOrders(this.repositoryFactory);
		return placeOrder.execute();
	}
}