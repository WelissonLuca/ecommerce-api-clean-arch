import { CouponRepository } from "../repositories/CouponRepository";
import { ItemRepository } from "../repositories/ItemRepository";
import { OrderRepository } from "../repositories/OrderRepository";

export interface RepositoryFactory {
  createItemRepository(): ItemRepository;
  createOrderRepository(): OrderRepository;
  createCouponRepository(): CouponRepository;
}
