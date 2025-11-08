import { CategoryRepository } from '@/models';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) { }
  async create(category: Category) {
    const categoryExists = await this.categoryRepository.getOne({ slug: category.slug });

    if (categoryExists) {
      throw new ConflictException('This Category already exists');
    }

    return await this.categoryRepository.create(category);
  }

  findAll() {
    const categories = this.categoryRepository.getMany({}, {},
      {
        populate: [{ path: 'createdby' }, { path: 'updatedby' }],
      });
    if (!categories) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.getOne({ _id: id },{},{populate: [{path:'createdby'}, {path:'updatedby'}] });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, category: Category) {
    const categoryExists = await this.categoryRepository.getOne({ slug: category.slug, _id: { $ne: id } });
    if (categoryExists) {
      throw new ConflictException('This Category already exists');
    }
    return await this.categoryRepository.updateOne({ _id: id }, category, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
