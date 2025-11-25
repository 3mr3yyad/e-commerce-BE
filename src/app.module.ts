import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, adminSchema, Seller, SellerSchema, User, UserSchema } from './models';
import { AuthFactoryService } from './modules/auth/factory';
import { CustomerModule } from './modules/customer/customer.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [devConfig],
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('db').URL,
            }),
        }),

        AuthModule,
        ProductModule,
        CategoryModule,
        BrandModule,
        CustomerModule,
        CouponModule,
        CartModule
    ],
    controllers: [AppController],

    providers: [
        AppService,
        AuthFactoryService
    ],
})
export class AppModule {}
