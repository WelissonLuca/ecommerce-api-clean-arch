import { PlaceOrder } from "../../application/useCases/place_order/PlaceOrder";
import { RepositoryFactory } from "../../domain/factories/RepositoryFactory";

export class PlaceOrderController {
  constructor(readonly repositoryFactory: RepositoryFactory) {}

  async execute(params: any, body: any) {
    const placeOrder = new PlaceOrder(this.repositoryFactory);
    const input = body;
    input.date = new Date(input.date);
    return placeOrder.execute(input);
  }
}
