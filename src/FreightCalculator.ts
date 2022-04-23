import { Item } from './Item';
export class FreightCalculator {
  constructor() {}
  static calculate(item: Item): number { 
      const freight = 1000 * item.getVolume() * (item.getDensity() / 100);
			const minFreight = 10;
			return Math.max(minFreight, freight);
  }
}