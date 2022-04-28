import { Item } from '../../../domain/entities/Item';
import { Connection } from '../../database/Connection';
import { ItemRepository } from '../../../domain/repositories/ItemRepository';
export class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) { }
  async findById(id: number): Promise<Item | undefined> {
    const [itemData] = await this.connection.query(
			"select * from ccca.item where id_item = $1",
			[id]
		);

    if (!itemData) return;

    return new Item(itemData.id_item, itemData.category, itemData.description, itemData.price, {
      width: itemData.width,
      height: itemData.height,
      length: itemData.length,
      weight: itemData.weight
    });
  }
  
  
}