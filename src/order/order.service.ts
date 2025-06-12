import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  
  create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.save(createOrderDto);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { id } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Promise<UpdateResult> {
    return this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.orderRepository.delete(id);
  }
}
