import { Coupon } from "../entities/Coupon";

export interface CouponRepository {
  findByCode(code: string): Promise<Coupon | undefined>;
}
