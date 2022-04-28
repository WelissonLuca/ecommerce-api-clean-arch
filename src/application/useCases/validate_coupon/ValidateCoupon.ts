import { CouponRepository } from "../../../domain/repositories/CouponRepository";

export class ValidateCoupon {
  constructor(
    private readonly couponRepository: CouponRepository
  ) { }
  
  async execute(code: string): Promise<boolean> { 
    const coupon = await this.couponRepository.findByCode(code);
    
    if (!coupon) throw new Error("Invalid coupon");
    
    return coupon.isValid();
  }
}