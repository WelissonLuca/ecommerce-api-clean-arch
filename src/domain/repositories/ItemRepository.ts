import { Item } from "../entities/Item";

export interface ItemRepository {
	findById(id: number): Promise<Item | undefined>;
}