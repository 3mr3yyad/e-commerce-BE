import { Auth, MESSAGE, Public, User } from '@/common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFactoryService } from './factory';

@Controller('brand')
@Auth(['Admin'])
export class BrandController {
  constructor(private readonly brandService: BrandService,
    private readonly brandFactoryService: BrandFactoryService
  ) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto, @User() user: any) {
    const brand = this.brandFactoryService.createBrand(createBrandDto, user);
    const createdBrand = await this.brandService.create(brand);
    return {
      success: true,
      message: MESSAGE.brand.created,
      data: createdBrand
    };
  }

  @Public()
  @Get()
  async findAll() {
    const brands = await this.brandService.findAll();
    return {
      success: true,
      message: "Brands fetched successfully",
      data: brands
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const brand = await this.brandService.findOne(id);
    return {
      success: true,
      message: "Brand fetched successfully",
      data: brand
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto, @User() user: any) {
    const brand = this.brandFactoryService.updateBrand(id, updateBrandDto, user);
    const updatedBrand = await this.brandService.update(id, brand);
    return {
      success: true,
      message: "Brand updated successfully",
      data: updatedBrand
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const brand = await this.brandService.remove(id);
    return {
      success: true,
      message: "Brand deleted successfully",
      data: brand
    };
  }
}
