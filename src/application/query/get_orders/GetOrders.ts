import { OrderDao } from "../../dao/OrderDao";
import { GetOrdersOutput } from "./GetOrdersOutput";

export class GetOrders {
  constructor(readonly orderDao: OrderDao) {}

  async execute(): Promise<GetOrdersOutput> {
    const ordersData = await this.orderDao.findAll();
    const getOrdersOutput = new GetOrdersOutput();
    for (const orderData of ordersData) {
      getOrdersOutput.addOrder(orderData.code, orderData.total);
    }

    return getOrdersOutput;
  }
}
