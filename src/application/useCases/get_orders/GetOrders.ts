import { RepositoryFactory } from "../../../domain/factories/RepositoryFactory";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { GetOrdersOutput } from "./GetOrdersOutput";

export class GetOrders {
  orderRepository: OrderRepository;

  constructor(readonly repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(): Promise<GetOrdersOutput> {
    const orders = await this.orderRepository.findAll();
    const getOrdersOutput = new GetOrdersOutput();
    for (const order of orders) {
      getOrdersOutput.addOrder(order.getCode(), order.getTotal());
    }
    return getOrdersOutput;
  }
}
