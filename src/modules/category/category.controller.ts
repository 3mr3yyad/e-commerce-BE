import { Auth, Public, User } from '@/common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './factory';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService
  ) { }

  @Post()
  @Auth(['Admin'])

  async create(@Body() createCategoryDto: CreateCategoryDto, @User() user: any) {
    const category = this.categoryFactoryService.createCategory(createCategoryDto, user);
    const createdCategory = await this.categoryService.create(category);
    return {
      message: 'Category created successfully',
      success: true,
      data: createdCategory
    };
  }

  @Public()
  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      message: 'Categories found successfully',
      success: true,
      data: categories
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return {
      message: 'Category found successfully',
      success: true,
      data: category
    };
  }

  @Auth(['Admin'])
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @User() user: any) {
    const category = await this.categoryFactoryService.updateCategory(id, updateCategoryDto, user);
    const updatedCategory = await this.categoryService.update(id, category);
    return {
      message: 'Category updated successfully',
      success: true,
      data: updatedCategory
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
    return {
      message: 'Category deleted successfully',
      success: true,
    };
  }
}
