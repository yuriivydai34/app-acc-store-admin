import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

import * as fs from 'fs/promises';
import * as path from 'path';

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

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['files']
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    try {
      // Delete physical files first
      const deleteFilePromises = product.files.map(file => 
        fs.unlink(path.join(process.cwd(), file.url))
          .catch(err => {
            if (err.code !== 'ENOENT') {
              throw err;
            }
          })
      );

      await Promise.all(deleteFilePromises);

      // Delete product (will cascade delete files from DB)
      await this.productRepository.remove(product);

      return { message: `Product ${product.id} and its files have been deleted` };
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

}
