import { GetOrder } from "../../application/useCases/get_order/GetOrder";
import { GetOrders } from "../../application/useCases/get_orders/GetOrders";
import { RepositoryFactory } from "../../domain/factories/RepositoryFactory";

export class GetOrderController {
	constructor(readonly repositoryFactory: RepositoryFactory) {}
	async execute(params: any, body: any) {
		const code = params.code;
		const getOrder = new GetOrder(this.repositoryFactory);
		return getOrder.execute(code);
	}
}