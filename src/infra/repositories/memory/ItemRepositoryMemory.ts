import { Item } from "../../../domain/entities/Item";
import { ItemRepository } from "../../../domain/repositories/ItemRepository";

export class ItemRepositoryMemory implements ItemRepository {
  items: Item[] = [];

  constructor() {
    this.items = [
      new Item(1, "Música", "CD", 30),
      new Item(2, "Video", "DVD", 50),
      new Item(3, "Vídeo", "VHS", 10),
      new Item(4, "Música", "BATERIA", 1000, {
        width: 100,
        height: 30,
        length: 10,
        weight: 3,
      }),

      new Item(5, "Livros", "ARQUITETURA LIMPA", 100, {
        width: 100,
        height: 50,
        length: 50,
        weight: 20,
      }),

      new Item(6, "Acessórios", "XBOX", 2500, {
        width: 10,
        height: 10,
        length: 10,
        weight: 0.9,
      }),
    ];
  }

  findById(id: number): Promise<Item | undefined> {
    return Promise.resolve(this.items.find((item) => item.id === id));
  }
}
