import { Coupon } from './../src/Coupon';


describe('Coupon', () => { 
  it('should create a valid coupon', () => { 
    const coupon = new Coupon('vale10', 10)
    const isValid = coupon.isValid()
    expect(isValid).toBeTruthy()
  });

  it("should not create a coupon if not valid", () => {
		const coupon = new Coupon("vale10", 10, new Date("2021-12-10"));
		const isValid = coupon.isValid();
		expect(isValid).toBeFalsy();
	});
});