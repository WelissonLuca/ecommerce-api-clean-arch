export class Coupon {
	constructor(
		readonly name: string,
		readonly percentage: number,
		readonly expireDate?: Date
	) {}

	isValid(today: Date) {
		if (!this.expireDate) return true;
		return this.expireDate.getTime() >= today.getTime();
	}

	isExpired(today: Date) {
		if (!this.expireDate) return false;
		return this.expireDate.getTime() < today.getTime();
	}
}
