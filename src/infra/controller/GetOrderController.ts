import { GetOrder } from "../../application/query/get_order/GetOrder";
import { Connection } from "../database/Connection";

export class GetOrderController {
	constructor(readonly connection: Connection) {}
	async execute(params: any, body: any) {
		const code = params.code;
		const getOrder = new GetOrder(this.connection);
		return getOrder.execute(code);
	}
}