export class Coupon {
  constructor(
    readonly name: string,
    readonly percentage: number,
    readonly expireDate?: Date
  ) {}

  isValid(today: Date = new Date()): boolean {
    if (!this.expireDate) return true;
    return this.expireDate.getTime() >= today.getTime();
  }

  isExpired(today: Date = new Date()): boolean {
    if (!this.expireDate) return false;
    return this.expireDate.getTime() < today.getTime();
  }

  calculateDiscount(amount: number, today: Date = new Date()): number {
    if (this.isExpired(today)) return 0;

    return (amount * this.percentage) / 100;
  }
}
