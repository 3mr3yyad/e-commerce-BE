import { AuthGuard, Public, Roles, RolesGuard } from '@/common';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
@UseGuards(AuthGuard, RolesGuard)
@Roles(['Customer', 'Admin'])
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }
  @Get('')
  @Public()
  getProfile(@Request() req: any) {
    const { password, otp, otpExpiry, ...userObj } = JSON.parse(JSON.stringify(req.user));

    return {
      message: 'done',
      success: true,
      data: { user: userObj }
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
  //   return this.customerService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.remove(+id);
  // }
}
