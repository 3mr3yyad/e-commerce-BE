import { CustomerRepository } from '@/models';
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { Customer } from './entities/auth.entity';
import { generateOTP, sendMail } from '@/common';
import { VerifyOtpDto } from './dto/verifiy-otp.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly customerRepository: CustomerRepository,
    private readonly jwtService: JwtService,
    private readonly oauth2Client: OAuth2Client
  ) { }
  async register(customer: Customer) {
    const customerExists = await this.customerRepository.getOne({ email: customer.email })
  
    if (customerExists) {
      if(customer.googleLogin){
        throw new ConflictException('please login with google')
      }
      throw new ConflictException('User already exists')
    }

    const createdCustomer = await this.customerRepository.create(customer);

    await sendMail({
      from: process.env.EMAIL,
      to: customer.email,
      subject: 'Verify your email',
      html: `<h1>Welcome to E-commerce</h1>
            <p>Your confirmation -otp- code is: <b><mark>${customer.otp}</mark></b></p>
            <p><em>Your OTP expires in <strong>5 minutes</strong></em></p>`
    })

    const { password, otp, otpExpiry, ...customerObj } = JSON.parse(JSON.stringify(createdCustomer));

    return customerObj as Customer;
  }

  async verifyEmail(verifyOtpDto: VerifyOtpDto) {
    const customer = await this.customerRepository.getOne({ email: verifyOtpDto.email });
    if (!customer) {
      throw new NotFoundException('User not found');
    }
    if (customer.otp != verifyOtpDto.otp) {
      throw new BadRequestException('Invalid OTP');
    }
    if (customer.otpExpiry < new Date()) {
      throw new BadRequestException('OTP expired');
    }
    await this.customerRepository.update({ _id: customer._id }, { isVerified: true, $unset: { otp: "", otpExpiry: "" } });
    return customer;
  }

  async login(loginDto: LoginDto) {
    const customerExists = await this.customerRepository.getOne({ email: loginDto.email });
    if (!customerExists) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if(customerExists.googleLogin){
        throw new ConflictException('please login with google')
      }

    const isPasswordMatched = await bcrypt.compare(loginDto.password, customerExists.password as string);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({
      _id: customerExists._id,
      email: customerExists.email,
      role: customerExists.role,
      userName: customerExists.userName,
    }, {
      secret: this.configService.get('jwt').SECRET_KEY,
      expiresIn: '1d',
    });
    return token;
  }

  async verifyGoogleToken(idToken: string) {
    try {
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new UnauthorizedException('Invalid Google token');

      const { email, name } = payload;

      let user = await this.customerRepository.getOne({ email }) as any;

      if (!user) {
        const createdUser = await this.customerRepository.create({
          isVerified: true,
          userName: name,
          email,
          googleLogin: true,
        });
        user = createdUser?.toObject()
      }

      const token = this.jwtService.sign(
        { _id: user._id, email: user.email, role: user.role, userName: user.userName },
        { secret: this.configService.get('jwt').SECRET_KEY, expiresIn: '1d' },
      );

      return {
        message: user ? 'User logged in' : 'User created',
        user,
        accessToken: token,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid Google ID token');
    }
  }

  async forgotPassword(email: string) {
    const customer = await this.customerRepository.getOne({ email });
    if (!customer) {
      throw new NotFoundException('User not found');
    }
    const otp = generateOTP().toString();
    await this.customerRepository.update({ _id: customer._id }, { otp, otpExpiry: new Date(Date.now() + 5 * 60 * 1000) });
    await sendMail({
      from: process.env.EMAIL,
      to: customer.email,
      subject: 'Reset your password',
      html: `<h1>Reset your password</h1>
            <p>Your reset password -otp- code is: <b><mark>${otp}</mark></b></p>
            <p><em>Your OTP expires in <strong>5 minutes</strong></em></p>`
    })
    await this.customerRepository.update({ _id: customer._id }, { otp, otpExpiry: new Date(Date.now() + 5 * 60 * 1000) });
    return {
      message: 'OTP sent successfully, check your email',
      success: true
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const customer = await this.customerRepository.getOne({ email: resetPasswordDto.email });
    if (!customer) {
      throw new NotFoundException('User not found');
    }
    if (customer.otp != resetPasswordDto.otp) {
      throw new BadRequestException('Invalid OTP');
    }
    if (customer.otpExpiry < new Date()) {
      throw new BadRequestException('OTP expired');
    }
    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);
    await this.customerRepository.update(
      { _id: customer._id },
      { $set: { password: hashedPassword }, $unset: { otp: "", otpExpiry: "" } });
    return {
      message: 'Password reset successfully, you can now login',
      success: true
    };
  }
}
