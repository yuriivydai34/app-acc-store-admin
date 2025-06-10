import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  
  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.save(createProductDto);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: {
        files: true
      }
    });
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: {
        files: true
      }
    });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

}
