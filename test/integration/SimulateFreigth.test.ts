import { DefaultFreightCalculator } from './../../src/domain/entities/DefaultFreightCalculator';
import { SimulateFreigth } from "../../src/application/useCases/simulate_freigth/SimulateFreigth";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import { ItemRepositoryDatabase } from "../../src/infra/repositories/database/ItemRepositoryDatabase";
import SimulateFreigthInput from '../../src/application/useCases/simulate_freigth/SimulateFreigthInput';

describe('SimulateFreigth', () => { 
  it('shoud be a simulate freigth', async () => { 
    const connection = new PgPromiseConnectionAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const freightCalculator = new DefaultFreightCalculator();
    const simulateFreigth = new SimulateFreigth(
			itemRepository,
			freightCalculator
		);

    const input = new SimulateFreigthInput([
			{ idItem: 4, quantity: 1 },
			{ idItem: 5, quantity: 1 },
			{ idItem: 6, quantity: 3 },
		]);
    const output = await simulateFreigth.execute(input);

    expect(output.amount).toBe(260);
  });
});