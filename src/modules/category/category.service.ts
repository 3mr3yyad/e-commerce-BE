import { CategoryRepository } from '@/models';
import { ConflictException, Injectable } from '@nestjs/common';
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

  // findAll() {
  //   return `This action returns all category`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  async update(id: string, category: Category) {
    const categoryExists = await this.categoryRepository.getOne({ slug: category.slug });
    if (categoryExists) {
      throw new ConflictException('This Category already exists');
    }
    return await this.categoryRepository.updateOne({ _id: id }, category, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
