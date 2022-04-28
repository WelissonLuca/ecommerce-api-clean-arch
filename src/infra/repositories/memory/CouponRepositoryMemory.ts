import { Coupon } from "../../../domain/entities/Coupon";
import { CouponRepository } from "../../../domain/repositories/CouponRepository";

export class CouponRepositoryMemory implements CouponRepository {
	coupons: Coupon[] = [];
	constructor() {
		this.coupons = [
			new Coupon("VALE10", 10),
			new Coupon("VALE20", 20),
			new Coupon("VALE30", 30),
		];
	}
	findByCode(code: string): Promise<Coupon | undefined> {
		return Promise.resolve(this.coupons.find((coupon) => coupon.name === code));
	}
}
