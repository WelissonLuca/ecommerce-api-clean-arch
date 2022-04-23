import { CouponRepositoryMemory } from './../../src/infra/repositories/memory/CouponRepositoryMemory';
import { ItemRepositoryMemory } from './../../src/infra/repositories/memory/ItemRepositoryMemory';
import { PlaceOrder } from "../../src/application/useCases/PlaceOrder";
import { OrderRepositoryMemory } from '../../src/infra/repositories/memory/OrderRepositoryMemory';

describe("PlaceOrder", () => {
  it("should be a place order", async () => {
    const itemRepository = new ItemRepositoryMemory();
    const orderRepository = new OrderRepositoryMemory();
    const couponRepository = new CouponRepositoryMemory();
    
		const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
		const input = {
			cpf: "606.915.690-02",
			orderItems: [
				{ idItem: 1, quantity: 1 },
				{ idItem: 2, quantity: 2 },
				{ idItem: 3, quantity: 3 },
			],
			date: new Date(),
			coupon: "VALE20",
		};

    const output = await placeOrder.execute(input);
    
    expect(output.total).toBe(128);
	});
});