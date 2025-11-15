import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponFactoryService } from './factory/coupon.factory';
import { UserMongoModule } from '@/shared';
import { JwtService } from '@nestjs/jwt';
import { Coupon, CouponRepository, couponSchema } from '@/models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserMongoModule,
    MongooseModule.forFeature([
      { name: Coupon.name, schema: couponSchema },
    ]),
  ],
  controllers: [CouponController],
  providers: [
    CouponService,
    CouponRepository,
    CouponFactoryService,
    JwtService

  ],
})
export class CouponModule {}
