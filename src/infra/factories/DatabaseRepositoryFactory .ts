import { RepositoryFactory } from "../../domain/factories/RepositoryFactory";
import { CouponRepository } from "../../domain/repositories/CouponRepository";
import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { PgPromiseConnectionAdapter } from "../database/PgPromiseConnectionAdapter";
import { CouponRepositoryDatabase } from "../repositories/database/CouponRepositoryDatabase";
import { ItemRepositoryDatabase } from "../repositories/database/ItemRepositoryDatabase";
import { OrderRepositoryDatabase } from "../repositories/database/OrderRepositoryDatabase";

export class DatabaseRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance());
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
  }
}
