import { generateOTP } from "@/common";
import { RegisterDto } from "../dto/register.dto";
import { Customer } from "../entities/auth.entity";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthFactoryService{
    async createCustomer(registerDto:RegisterDto){
        const customer = new Customer();
        customer.userName = registerDto.userName;
        customer.email = registerDto.email;
        customer.password = await bcrypt.hashSync(registerDto.password, 10);
        customer.otp = generateOTP().toString();
        customer.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
        customer.isVerified = false;
        customer.dob = registerDto.dob;
        customer.address = registerDto.address;
        customer.phoneNumber = registerDto.phoneNumber;
        customer.googleLogin = false;

        return customer;
    }
}
