export class Coupon {
	constructor(
		readonly name: string,
		readonly percentage: number,
		readonly expireDate?: Date
	) {}

	isValid() {
		if (!this.expireDate) return true;
		return this.expireDate.getTime() > new Date().getTime();
	}
}
