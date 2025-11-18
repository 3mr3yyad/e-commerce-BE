import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepository, ProductRepository } from '@/models';
import { MESSAGE } from '@/common';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository,
    private readonly productRepository: ProductRepository
  ) { }
  async create(brand: Brand) {
    const brandExists = await this.brandRepository.getOne({ slug: brand.slug })
    if (brandExists) {
      throw new ConflictException(MESSAGE.brand.alreadyExists);
    }

    return await this.brandRepository.create(brand);
  }

  async findAll() {
    const brands = await this.brandRepository.getMany({deleted:false}, {}, { populate: [{ path: 'createdby' }, { path: 'updatedby' }] });
    if (!brands || brands.length == 0) {
      throw new NotFoundException(MESSAGE.brand.notFound);
    }
    return brands;
  }

  async findOne(id: string | Types.ObjectId) {
    const brand = await this.brandRepository.getOne({ _id: id, deleted: false }, {}, { populate: [{ path: 'createdby' }, { path: 'updatedby' }] });
    if (!brand) {
      throw new NotFoundException(MESSAGE.brand.notFound);
    }
    return brand;
  }

  async update(id: string, brand: Brand) {
    const brandExists = await this.brandRepository.getOne({ slug: brand.slug, _id: { $ne: id } });
    if (!brandExists || brand.deleted) {
      throw new NotFoundException(MESSAGE.brand.notFound);
    }
    return await this.brandRepository.updateOne({ _id: id }, brand, { new: true });
  }

  async remove(id: string) {
    const brand = await this.brandRepository.getOne({ _id: id });
    if (!brand || brand.deleted) {
      throw new NotFoundException(MESSAGE.brand.notFound);
    }
    await this.brandRepository.updateOne({ _id: id }, { deleted: true });
    await this.productRepository.updateMany({ brandId: id }, { deleted: true });
    return true;
  }
}
