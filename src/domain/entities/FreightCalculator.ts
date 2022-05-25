import { Item } from "./Item";

export interface FreightCalculator {
  calculate(item: Item): number;
}
