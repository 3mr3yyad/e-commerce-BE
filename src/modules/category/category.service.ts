import { BrandRepository, CategoryRepository, ProductRepository } from '@/models';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Types } from 'mongoose';
import { MESSAGE } from '@/common';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly productRepository: ProductRepository,
  ) { }
  async create(category: Category) {
    const categoryExists = await this.categoryRepository.getOne({ slug: category.slug });

    if (categoryExists) {
      throw new ConflictException(MESSAGE.category.alreadyExists);
    }

    return await this.categoryRepository.create(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.getMany({deleted:false}, {},
      {
        populate: [{ path: 'createdby' }, { path: 'updatedby' }],
      });

    if (!categories || categories.length == 0) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    return categories;
  }

  async findOne(id: string | Types.ObjectId) {
    const category = await this.categoryRepository.getOne({ _id: id },{},{populate: [{path:'createdby'}, {path:'updatedby'}] });
    if (!category || category.deleted) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    return category;
  }

  async update(id: string, category: Category) {
    const categoryExists = await this.categoryRepository.getOne({ slug: category.slug, _id: { $ne: id } });
    if (!categoryExists || category.deleted) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    return await this.categoryRepository.updateOne({ _id: id }, category, { new: true });
  }

  async remove(id: string | Types.ObjectId) {
    const category = await this.categoryRepository.getOne({ _id: id });
    if (!category || category.deleted) {
      throw new NotFoundException(MESSAGE.category.notFound);
    }
    await this.categoryRepository.updateOne({ _id: id }, { deleted: true });
    await this.productRepository.updateMany({ categoryId: id }, { deleted: true });

    return true;
  }
}
