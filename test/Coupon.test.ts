import { Coupon } from "./../src/Coupon";

describe("Coupon", () => {
	it("should create a valid coupon if non-existing expire date", () => {
		const now = new Date();
		const coupon = new Coupon("vale10", 10);
		const isValid = coupon.isValid(now);
		expect(isValid).toBeTruthy();
  });
  
  	it("should create a valid coupon", () => {
			const now = new Date();
			const coupon = new Coupon("vale10", 10, new Date(now.getTime() + 1000));
			const isValid = coupon.isValid(now);
			expect(isValid).toBeTruthy();
		});

	it("should not create a coupon if not valid", () => {
		const now = new Date();
		const coupon = new Coupon("vale10", 10, new Date("2021-12-10"));
		const isValid = coupon.isValid(now);
		expect(isValid).toBeFalsy();
	});

	it("should not create a coupon if expired date", () => {
		const now = new Date();
		const coupon = new Coupon("vale10", 10, new Date("2021-12-10"));
		const isExpired = coupon.isExpired(now);
		expect(isExpired).toBeTruthy();
	});

	it("should apply discount a valid coupon", () => {
		const now = new Date();
		const coupon = new Coupon("vale10", 10, new Date(now.getTime() + 1000));
		const discount = coupon.calculateDiscount(100);
		expect(discount).toBe(10);
	});
});
