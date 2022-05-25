import { Coupon } from "../../../domain/entities/Coupon";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";
import { Connection } from "../../database/Connection";

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) {}

  async findByCode(code: string): Promise<Coupon | undefined> {
    const [couponData] = await this.connection.query(
      "select * from ccca.coupon where code = $1",
      [code]
    );

    if (!couponData) return undefined;

    return new Coupon(
      couponData.code,
      couponData.percentage,
      couponData.expire_date
    );
  }
}
