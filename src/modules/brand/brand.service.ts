import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from '@/models';
import { message } from '@/common';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) { }
  async create(brand: Brand) {
    const brandExists = await this.brandRepository.getOne({ slug: brand.slug })
    if (brandExists) {
      throw new ConflictException(message.brand.alreadyExists);
    }

    return await this.brandRepository.create(brand);
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
