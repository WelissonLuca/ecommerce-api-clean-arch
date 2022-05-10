import { RepositoryFactory } from '../../domain/factories/RepositoryFactory';
import { CouponRepository } from '../../domain/repositories/CouponRepository';
import { ItemRepository } from '../../domain/repositories/ItemRepository';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { CouponRepositoryMemory } from '../repositories/memory/CouponRepositoryMemory';
import { OrderRepositoryMemory } from '../repositories/memory/OrderRepositoryMemory';
import { ItemRepositoryMemory } from './../repositories/memory/ItemRepositoryMemory';

export class MemoryRepositoryFactory implements RepositoryFactory { 
  constructor() { }

  createItemRepository(): ItemRepository { 
    return new ItemRepositoryMemory();
  }

  createOrderRepository(): OrderRepository { 
    return new OrderRepositoryMemory();
  }

  createCouponRepository(): CouponRepository { 
    return new CouponRepositoryMemory();
  }
}