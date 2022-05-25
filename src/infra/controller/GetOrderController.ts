import { OrderDao } from './../../application/dao/OrderDao';
import { GetOrder } from "../../application/query/get_order/GetOrder";

export class GetOrderController {
	constructor(readonly orderDao: OrderDao) {}
	async execute(params: any, body: any) {
		const code = params.code;
		const getOrder = new GetOrder(this.orderDao);
		return getOrder.execute(code);
	}
}