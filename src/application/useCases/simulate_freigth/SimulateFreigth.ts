import { FreightCalculator } from "../../../domain/entities/FreightCalculator";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";
import SimulateFreigthInput from "./SimulateFreigthInput";
import { SimulateFreigthOutput } from "./SimulateFreigthOutput";

export class SimulateFreigth {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly freightCalculator: FreightCalculator
  ) {}

  async execute(input: SimulateFreigthInput): Promise<SimulateFreigthOutput> {
    let amount = 0;

    for (const inputItem of input.items) {
      const item = await this.itemRepository.findById(inputItem.idItem);
      if (!item) {
        throw new Error("Item not found");
      }

      amount += this.freightCalculator.calculate(item) * inputItem.quantity;
    }

    return new SimulateFreigthOutput(amount);
  }
}
