import { CreateCouponDto } from "../dto/create-coupon.dto";
import { Coupon } from "../entities/coupon.entity";

export class CouponFactoryService {
    createCoupon(createCouponDto: CreateCouponDto, user: any) {
        const coupon = new Coupon()
        coupon.code = createCouponDto.code
        coupon.discountAmount = createCouponDto.discountAmount
        coupon.discountType = createCouponDto.discountType
        coupon.startDate = createCouponDto.startDate
        coupon.endDate = createCouponDto.endDate
        coupon.active = createCouponDto.active
        coupon.usedBy = []
        coupon.assignedTo = createCouponDto.assignedTo.map((id) => ({customerId: id, count: 0}))
        coupon.createdBy = user._id
        coupon.updatedBy = user._id
        return coupon
    }
}