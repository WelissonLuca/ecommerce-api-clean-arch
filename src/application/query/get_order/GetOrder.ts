import { Connection } from "../../../infra/database/Connection";
import { OrderDao } from "../../dao/OrderDao";
import { GetOrderOutput } from "./GetOrderOutput";

export class GetOrder {
  constructor(readonly orderDao: OrderDao) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const orderData = await this.orderDao.get(code);
    const getOrderOutput = new GetOrderOutput(orderData.code, orderData.total);
    return getOrderOutput;
  }
}
