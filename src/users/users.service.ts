import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  findAll(user: User) {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedException('You must be an admin to access this resource.');
    }
    return this.usersRepository.find({select: ['id', 'username', 'isActive', 'isAdmin']});
  }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOne({where: { username }});
  }

  findOneById(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
