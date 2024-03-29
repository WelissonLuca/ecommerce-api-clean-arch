import { FreightCalculator } from "./FreightCalculator";
import { Item } from "./Item";

export class DefaultFreightCalculator implements FreightCalculator {
  calculate(item: Item): number {
    if (!item.properties) return 0;
    const freight = 1000 * item.getVolume() * (item.getDensity() / 100);
    const minFreight = 10;
    return Math.max(minFreight, freight);
  }
}
