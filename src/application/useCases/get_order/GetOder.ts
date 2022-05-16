import { RepositoryFactory } from "../../../domain/factories/RepositoryFactory";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { GetOrderOutput } from "./GetOrderOutput";

export class GetOrder {
	orderRepository: OrderRepository;
	constructor(readonly repositoryFactory: RepositoryFactory) {
		this.orderRepository = repositoryFactory.createOrderRepository();
	}

	async execute(code: string): Promise<GetOrderOutput> {
		const order = await this.orderRepository.get(code);
		const getOrderOutput = new GetOrderOutput(
			order.getCode(),
			order.getTotal()
		);
		return getOrderOutput;
	}
}
