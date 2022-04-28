import { ValidateCoupon } from "../../src/application/useCases/validate_coupon/ValidateCoupon";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import { CouponRepositoryDatabase } from "./../../src/infra/repositories/database/CouponRepositoryDatabase";

let validateCoupon: ValidateCoupon;
describe("ValidateCoupon", () => {
	beforeEach(async () => {
		const connection = new PgPromiseConnectionAdapter();
		const couponRepository = new CouponRepositoryDatabase(connection);
		validateCoupon = new ValidateCoupon(couponRepository);
	});
	it("should return a valid coupon", async () => {
		const isValid = await validateCoupon.execute("VALE20");
		expect(isValid).toBeTruthy();
	});

	it("should return false if invalid coupon", async () => {
		const isValid = await validateCoupon.execute("VALE20_EXPIRED");
		expect(isValid).toBeFalsy();
	});

	it("should return throw an error if not found coupon", async () => {
		const promise = validateCoupon.execute("VALE20_NOT_FOUND");
		await expect(promise).rejects.toThrowError("Invalid coupon");
	});
});
