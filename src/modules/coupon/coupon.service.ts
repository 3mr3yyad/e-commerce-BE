import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { CouponRepository } from '@/models';
import { MESSAGE } from '@/common';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}
  async create(coupon: Coupon) {
    const couponExists = await this.couponRepository.getOne({ code: coupon.code });
    if (couponExists) {
      throw new ConflictException(MESSAGE.coupon.alreadyExists);
    }
    return await this.couponRepository.create(coupon);
  }

  findAll() {
    return `This action returns all coupon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
