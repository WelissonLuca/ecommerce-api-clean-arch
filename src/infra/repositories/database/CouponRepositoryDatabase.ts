import { Coupon } from '../../../domain/entities/Coupon';
import { Connection } from '../../database/Connection';
import { CouponRepository } from './../../../domain/repositories/CouponRepository';
export class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) { 
      
  }
  async findByCode(code: string): Promise<Coupon | undefined> {
    const [couponData] = await this.connection.query('select * from ccca.coupon where code = $1', [code]);

    if (!couponData) return;

    return new Coupon(couponData.name, couponData.percentage, couponData.expire_date);
  }
}