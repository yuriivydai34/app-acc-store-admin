import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';

import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async handleFileUpload(file: Express.Multer.File, productId: number) {
    const product = await this.productRepository.findOneOrFail({
      where: { id: productId },
    });

    if (!file) {
      throw new BadRequestException('no file uploaded');
    }

    // validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('invalid file type');
    }

    // validate file size (e.g., max 5mb)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('file is too large!');
    }

    const fileEntity = new File();
    fileEntity.title = file.originalname;
    fileEntity.mimetype = file.mimetype;
    fileEntity.size = file.size;
    fileEntity.url = file.path;
    fileEntity.product = product;

    return this.fileRepository.save(fileEntity);
  }

  findAll() {
    return this.fileRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOne({
    where: { id }
  });

  if (!file) {
    throw new NotFoundException(`File with ID ${id} not found`);
  }

  try {
    // Delete the physical file
    await fs.unlink(path.join(process.cwd(), file.url));

    // Delete the database record
    await this.fileRepository.remove(file);

    return { message: `File ${file.title} has been deleted` };
  } catch (error) {
    // If file doesn't exist in filesystem, still delete from database
    if (error.code === 'ENOENT') {
      await this.fileRepository.remove(file);
      return { message: `File record deleted, but file was not found in filesystem` };
    }
    throw error;
  }
  }
}
