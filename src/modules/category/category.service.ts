import { CategoryRepository } from '@/models';
import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
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
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
