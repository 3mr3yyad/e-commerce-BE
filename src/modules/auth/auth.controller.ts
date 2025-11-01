import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthFactoryService } from './factory';
import { CustomerRepository } from '@/models';
import { VerifyOtpDto } from './dto/verifiy-otp.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';


@Controller('auth')

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService,
    private readonly customerRepository: CustomerRepository
  ) { }

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    const customer = await this.authFactoryService.createCustomer(registerDto);
    const createdCustomer = await this.authService.register(customer);
    return {
      message: 'User created successfully',
      success: true,
      data: createdCustomer
    };
  }

  @Post('verify-email')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    await this.authService.verifyEmail(verifyOtpDto);
    return {
      message: 'User verified successfully',
      success: true
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return {
      message: 'User logged in successfully',
      success: true,
      data: {token}
    };
  }

  @Post('google-login')
  async googleLogin(@Body('idToken') idToken: string) {
    const token = await this.authService.verifyGoogleToken(idToken);
    return {
      message: 'User logged in successfully',
      success: true,
      data: {token}
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.authService.forgotPassword(email);
    return {
      message: 'OTP sent successfully',
      success: true
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);
    return {
      message: 'Password reset successfully',
      success: true
    };
  }

}
